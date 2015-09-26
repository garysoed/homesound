const __array__ = Symbol('array');
const __getFn__ = Symbol('getFn');
const __hasValue__ = Symbol('getFn');

class ArrayCache {
  /**
   * @param {Function} getFn Function that is called with an array whenever the array needs to be
   *    populated. The function is expected to fill in the given array with values.
   */
  constructor(getFn) {
    this[__array__] = [];
    this[__getFn__] = getFn;
    this[__hasValue__] = false;
  }

  /**
   * @return {Array} The array with the updated value.
   */
  get() {
    if (!this[__hasValue__]) {
      this[__getFn__](this[__array__]);
      this[__hasValue__] = true;
    }
    return this[__array__];
  }

  /**
   * Clears the value of the array.
   */
  clear() {
    this[__hasValue__] = false;
  }
}

export default ArrayCache;
