import { Ctrl as VerseRenderCtrl } from './verse-render';

describe('lyric.VerseRenderCtrl', () => {
  let $apply;
  let audio;
  let verse;
  let ctrl;

  beforeEach(() => {
    audio = {};
    verse = {};
    $apply = jasmine.createSpy('$apply');
    ctrl = new VerseRenderCtrl({
      $apply: $apply,
      audio: audio,
      verse: verse,
      updateLoop: {
        addChild() {}
      }
    });
  });

  describe('updateInternal', () => {
    it('should activate and trigger digest if the time is within verse time', () => {
      audio.currentTime = 20;
      verse.startTime = 10;
      verse.endTime = 30;

      ctrl.updateInternal();

      expect($apply).toHaveBeenCalledWith(jasmine.any(Function));
      expect(ctrl.isActive).toEqual(true);
    });

    it('should deactivate if the time is before verse start time', () => {
      audio.currentTime = 5;
      verse.startTime = 10;
      verse.endTime = 30;

      ctrl.updateInternal();

      expect($apply).not.toHaveBeenCalled();
      expect(ctrl.isActive).toEqual(false);
    });

    it('should deactivate if the time is after verse end time', () => {
      audio.currentTime = 40;
      verse.startTime = 10;
      verse.endTime = 30;

      ctrl.updateInternal();

      expect($apply).not.toHaveBeenCalled();
      expect(ctrl.isActive).toEqual(false);
    });
  });

  describe('get percent', () => {
    it('should return the correct percentage', () => {
      audio.currentTime = 20;
      verse.startTime = 10;
      verse.endTime = 30;

      expect(ctrl.percent).toEqual(50);
    });

    it('should return 0 if the verse has not started', () => {
      audio.currentTime = 5;
      verse.startTime = 10;
      verse.endTime = 30;

      expect(ctrl.percent).toEqual(0);
    });

    it('should return 100 if the verse has ended', () => {
      audio.currentTime = 40;
      verse.startTime = 10;
      verse.endTime = 30;

      expect(ctrl.percent).toEqual(100);
    });
  });

  describe('get text', () => {
    it('should return the verse text', () => {
      verse.text = 'test text';
      expect(ctrl.text).toEqual(verse.text);
    });
  });
});
