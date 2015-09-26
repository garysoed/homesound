import Line from './line';
import WaveLine from './wave-line';

describe('effect.WaveLine', () => {
  const SPEED = 10;

  let audio;
  let wave;

  beforeEach(() => {
    audio = {
      frequencyData: [0],
      dataCount: 1,
      timeDomainData: []
    };
    wave = new WaveLine(audio, SPEED, 2 /* maxLines */, 0.5 /* triggerFrequencyAverage */);

    // Stubs out all the lines.
    for (let line of getPrivateProperty(wave, 'lines')) {
      spyOn(line, 'update').and.returnValue();
    }
  });

  function moveToDrawnArray(wave) {
    let undrawnLines = getPrivateProperty(wave, 'lines');
    let movedLine = undrawnLines.pop();
    getPrivateProperty(wave, 'drawnLines').add(movedLine);
    return movedLine;
  }

  describe('populateScene', () => {
    it('should add the undrawn and drawn lines to the scene', () => {
      let movedLine = moveToDrawnArray(wave);
      let otherLine = getPrivateProperty(wave, 'lines')[0];

      let scene = {};
      spyOn(movedLine, 'populateScene');
      spyOn(otherLine, 'populateScene');
      wave.populateScene(scene);

      expect(movedLine.populateScene).toHaveBeenCalledWith(scene);
      expect(otherLine.populateScene).toHaveBeenCalledWith(scene);
    });
  });

  describe('updateInternal', () => {
    it('should draw a line when the average frequency is high enough', () => {
      audio.frequencyData = [1, 1];
      audio.dataCount = 2;
      wave.updateInternal();

      expect(getPrivateProperty(wave, 'lines').length).toEqual(1);
      expect(getPrivateProperty(wave, 'drawnLines').size).toEqual(1);

      let drawnLine = Array.from(getPrivateProperty(wave, 'drawnLines'))[0];
      expect(drawnLine.visible).toEqual(true);
      expect(drawnLine.y).toEqual(0);
    });

    it('should not draw a line when the average frequency is too low', () => {
      audio.frequencyData = [0.25, 0.25];
      audio.dataCount = 2;
      wave.updateInternal();

      expect(getPrivateProperty(wave, 'lines').length).toEqual(2);
      expect(getPrivateProperty(wave, 'drawnLines').size).toEqual(0);
    });

    it('should not draw a line when all of the lines are currently drawn', () => {
      // Move all the undrawn lines to the drawn array.
      let undrawnLines = getPrivateProperty(wave, 'lines');
      while (undrawnLines.length > 0) {
        moveToDrawnArray(wave);
      }

      audio.frequencyData = [1, 1];
      audio.dataCount = 2;
      wave.updateInternal();

      expect(getPrivateProperty(wave, 'drawnLines').size).toEqual(2);
    });

    it('should update the drawn lines only', () => {
      let movedLine = moveToDrawnArray(wave);
      let undrawnLine = getPrivateProperty(wave, 'lines')[0];

      wave.updateInternal();

      expect(movedLine.update).toHaveBeenCalledWith();
      expect(undrawnLine.update).not.toHaveBeenCalled();
    });

    it('should hide the line if the line y coordinate is more than 1', () => {
      // Move an undrawn line to the drawn array.
      let movedLine = moveToDrawnArray(wave);
      movedLine.y = 2;

      wave.updateInternal();

      expect(getPrivateProperty(wave, 'drawnLines').size).toEqual(0);
      expect(getPrivateProperty(wave, 'lines').length).toEqual(2);
      expect(movedLine.visible).toEqual(false);
    });

    it('should hide the line if the line y coordinate is less than -1', () => {
      // Move an undrawn line to the drawn array.
      let movedLine = moveToDrawnArray(wave);
      movedLine.y = -2;

      wave.updateInternal();

      expect(getPrivateProperty(wave, 'drawnLines').size).toEqual(0);
      expect(getPrivateProperty(wave, 'lines').length).toEqual(2);
      expect(movedLine.visible).toEqual(false);
    });
  });
});
