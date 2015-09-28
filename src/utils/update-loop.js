import Updateable from './updateable';

const __loop__ = Symbol('loop');
const __isRunning__ = Symbol('isRunning');

export default class extends Updateable {
  constructor() {
    super();
    this[__isRunning__] = false;
  }

  [__loop__]() {
    if (this[__isRunning__]) {
      requestAnimationFrame(this[__loop__].bind(this));
    }
    this.update();
  }

  start() {
    this[__isRunning__] = true;
    this[__loop__]();
  }

  stop() {
    this[__isRunning__] = false;
  }

  updateInternal() {
    // Noop
  }
};
