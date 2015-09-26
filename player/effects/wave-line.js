import Effect from './effect';
import Line from './line';
import MovingEffect from './moving-effect';

const __audio__ = Symbol('audio');
const __drawnLines__ = Symbol('drawnLines');
const __lines__ = Symbol('lines');
const __triggerFrequencyAverage__ = Symbol('triggerFrequencyAverage');

class WaveLine extends Effect {
  constructor(audio, speed, maxLines, triggerFrequencyAverage) {
    super();
    this[__audio__] = audio;
    this[__triggerFrequencyAverage__] = triggerFrequencyAverage;
    this[__lines__] = [];
    this[__drawnLines__] = new Set();
    for (let i = 0; i < maxLines; i++) {
      let line = new Line(audio, 0.2, 0, 0x00ff00, 1);
      let movingLine = new MovingEffect(line, 0, speed);
      movingLine.visible = false;
      this[__lines__].push(movingLine);
    }
  }

  populateScene(scene) {
    for (let line of this[__lines__]) {
      line.populateScene(scene);
    }

    for (let line of this[__drawnLines__]) {
      line.populateScene(scene);
    }
  }

  updateInternal() {
    let timestamp = Date.now();
    // TODO(gs): Move average calculation to audio.
    let frequencySum = 0;
    for (let newValue of this[__audio__].frequencyData) {
      frequencySum += newValue;
    }

    let average = frequencySum / this[__audio__].dataCount;
    if (average > this[__triggerFrequencyAverage__] && this[__lines__].length > 0) {
      let line = this[__lines__].pop();
      line.visible = true;
      line.y = 0;
      this[__drawnLines__].add(line);
    }

    for (let line of this[__drawnLines__]) {
      // TODO(gs): Should be handled by updateable.
      line.update();
      if (line.y > 1 || line.y < -1) {
        this[__drawnLines__].delete(line);
        this[__lines__].push(line);
        line.visible = false;
      }
    }
  }
}

export default WaveLine;
