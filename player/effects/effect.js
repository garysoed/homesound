import Updateable from '../utils/updateable';

/**
 * Base class of all Effects.
 *
 * @class Effect
 */
class Effect extends Updateable {

  /**
   * @constructor
   * @param {number} [period] How long, in millis, between each update. Defaults to 0.
   */
  constructor(period = 0) {
    super(period);
  }

  /**
   * @override
   * @method populateScene
   */
  populateScene(scene) {
    throw Error('Unimplemented: populateScene');
  }

  get x() {
    throw Error('Unimplemented: get X');
  }

  set x(newX) {
    throw Error('Unimplemented: set X');
  }

  get y() {
    throw Error('Unimplemented: get Y');
  }

  set y(newY) {
    throw Error('Unimplemented: set Y')
  }
}

export default Effect;
