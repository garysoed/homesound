import Updateable from '../utils/updateable';

const __endTime__ = Symbol('endTime');
const __singerId__ = Symbol('singerId');
const __startTime__ = Symbol('startTime');
const __text__ = Symbol('text');

export default class Verse {
  constructor(startTime, endTime, singerId, text) {
    this[__startTime__] = startTime;
    this[__endTime__] = endTime;
    this[__singerId__] = singerId;
    this[__text__] = text;
  }

  get startTime() {
    return this[__startTime__];
  }

  get endTime() {
    return this[__endTime__];
  }

  get singerId() {
    return this[__singerId__];
  }

  get text() {
    return this[__text__];
  }
}
