import Effect from './effect';

const __amplitude__ = Symbol('amplitude');
const __audio__ = Symbol('audio');
const __geometry__ = Symbol('geometry');
const __line__ = Symbol('line');
const __yOffset__ = Symbol('yOffset');

class Line extends Effect {
  /**
   * @param {Audio} The Audio object.
   * @param {number} amplitude The amplitude of the line.
   * @param {number} yOffset Y offset of the line.
   * @param {number} color The line's color.
   * @param {number} opacity The line's opacity.
   * TODO(gs): Pass in config object.
   */
  constructor(audio, amplitude, yOffset, color, opacity) {
    super();

    let material = new THREE.LineBasicMaterial({
      linewidth: 1,
      color: color,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });

    let dataCount = audio.dataCount;
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1, yOffset, 0));
    for (let i = 0; i < dataCount * 2 - 1; i++) {
      geometry.vertices.push(new THREE.Vector3((i + 1) / dataCount - 1, yOffset, 0));
    }
    geometry.vertices.push(new THREE.Vector3(1, yOffset, 0))

    this[__line__] = new THREE.Line(geometry, material);
    this[__audio__] = audio;
    this[__amplitude__] = amplitude;
    this[__yOffset__] = yOffset;
    this[__geometry__] = geometry;
  }

  populateScene(scene) {
    scene.add(this[__line__]);
  }

  /**
   * Called to update the line.
   */
  updateInternal() {
    let newValues = this[__audio__].timeDomainData;
    let midIndex = (this[__geometry__].vertices.length - 1) / 2;
    for (let i = 0; i < newValues.length; i++) {
      this[__geometry__].vertices[midIndex - i].y = this[__yOffset__]
          + newValues[i] * this[__amplitude__];
      this[__geometry__].vertices[midIndex + i].y = this[__geometry__].vertices[midIndex - i].y;
    }
    this[__geometry__].verticesNeedUpdate = true;
  }

  get y() {
    return this[__yOffset__];
  }
  set y(newYOffset) {
    let diff = newYOffset - this[__yOffset__];
    for (let i = 0; i < this[__geometry__].vertices.length; i++) {
      this[__geometry__].vertices[i].y += diff;
    }
    this[__geometry__].verticesNeedUpdate = true;
    this[__yOffset__] = newYOffset;
  }

  get x() {
    return this[__geometry__].vertices[0].x;
  }

  set x(newX) {
    let diff = newX - this[__geometry__].vertices[0].x;
    for (let i = 0; i < this[__geometry__].vertices.length; i++) {
      this[__geometry__].vertices[i].x += diff;
    }
    this[__geometry__].verticesNeedUpdate = true;
  }

  get visible() {
    return this[__line__].visible;
  }

  set visible(isVisible) {
    this[__line__].visible = isVisible;
  }
}

export default Line;
