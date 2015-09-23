const __amplitude__ = Symbol('amplitude');
const __geometry__ = Symbol('geometry');
const __values__ = Symbol('values');
const __yOffset__ = Symbol('yOffset');

class Line extends THREE.Line {
  /**
   * @param {number} valuesCount Number of frequency points along the line.
   * @param {number} amplitude Amplitude of the line.
   * @param {number} yOffset Y offset of the line.
   * @param {number} color The line's color.
   * @param {number} opacity The line's opacity.
   */
  constructor(valuesCount, amplitude, yOffset, color, opacity) {
    let material = new THREE.LineBasicMaterial({
      linewidth: 1,
      color: color,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });

    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1, yOffset, 0));
    for (let i = 0; i < valuesCount * 2 - 1; i++) {
      geometry.vertices.push(new THREE.Vector3((i + 1) / valuesCount - 1, yOffset, 0));
    }
    geometry.vertices.push(new THREE.Vector3(1, yOffset, 0))

    super(geometry, material);

    this[__amplitude__] = amplitude;
    this[__values__] = 0;
    this[__yOffset__] = yOffset;
    this[__geometry__] = geometry;
  }

  get values() {
    return this[__values__];
  }

  set values(newValues) {
    this[__values__] = newValues;

    let midIndex = (this[__geometry__].vertices.length - 1) / 2;
    for (let i = 0; i < newValues.length; i++) {
      this[__geometry__].vertices[midIndex - i].y = this[__yOffset__]
          + newValues[i] * this[__amplitude__] * Math.pow(-1, i);
      this[__geometry__].vertices[midIndex + i].y = this[__geometry__].vertices[midIndex - i].y;
    }
    this[__geometry__].verticesNeedUpdate = true;
  }
}

export default Line;
