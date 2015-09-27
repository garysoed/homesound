import Effect from './effect';

const __audio__ = Symbol('audio');
const __effect__ = Symbol('effect');
const __speedX__ = Symbol('speedX');
const __speedY__ = Symbol('speedY');

class MovingEffect extends Effect {
  /**
   * @constructor
   * @param {effect.Effect} effect The effect to move.
   * @param {number} speedX Speed of the effect to move in the X direction, in unit per second.
   * @param {number} speedY Speed of the effect to move in the Y direction, in unit per second.
   */
  constructor(effect, speedX, speedY) {
    super();

    this[__effect__] = effect;
    this[__speedX__] = speedX;
    this[__speedY__] = speedY;

    this.addChild(effect);
  }

  updateInternal(elapsedTime) {
    let moveX = this[__speedX__] * elapsedTime / 1000;
    let moveY = this[__speedY__] * elapsedTime / 1000;
    this[__effect__].x += moveX;
    this[__effect__].y += moveY;
  }

  populateScene(scene) {
    this[__effect__].populateScene(scene);
  }

  get x() {
    return this[__effect__].x;
  }

  set x(newX) {
    this[__effect__].x = newX;
  }

  get y() {
    return this[__effect__].y;
  }

  set y(newY) {
    this[__effect__].y = newY;
  }

  get isActive() {
    return this[__effect__].isActive;
  }

  set isActive(active) {
    super.isActive = active;
    this[__effect__].isActive = active;
  }
}

export default MovingEffect;
