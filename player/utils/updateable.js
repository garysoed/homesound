const __lastUpdate__ = Symbol('lastUpdate');
const __period__ = Symbol('period');

class Updateable {
  constructor(period = 0) {
    this[__lastUpdate__] = Date.now();
    this[__period__] = period;
  }

  update() {
    let now = Date.now();
    let elapsedTime = now - this[__lastUpdate__];
    if (elapsedTime > this[__period__]) {
      this.updateInternal(elapsedTime);
      this[__lastUpdate__] = now;
    }
  }

  updateInternal() {
    throw new Error('Unimplemented: updateInternal');
  }
}

export default Updateable;
