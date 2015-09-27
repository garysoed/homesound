const __active__ = Symbol('active');
const __children__ = Symbol('children');
const __lastUpdate__ = Symbol('lastUpdate');
const __period__ = Symbol('period');

class Updateable {
  constructor(period = 0) {
    this[__active__] = true;
    this[__children__] = new Set();
    this[__lastUpdate__] = Date.now();
    this[__period__] = period;
  }

  update(now = Date.now()) {
    let elapsedTime = now - this[__lastUpdate__];
    if (elapsedTime > this[__period__]) {
      this.updateInternal(elapsedTime);
      this[__lastUpdate__] = now;
    }

    for (let child of this[__children__]) {
      child.update(now);
    }
  }

  updateInternal() {
    throw new Error('Unimplemented: updateInternal');
  }

  addChild(child) {
    this[__children__].add(child);
  }

  removeChild(child) {
    this[__children__].delete(child);
  }

  get isActive() {
    return this[__active__];
  }

  set isActive(active) {
    if (!this[__active__] && active) {
      this[__lastUpdate__] = Date.now();
    }
    this[__active__] = active;
  }
}

export default Updateable;
