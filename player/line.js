const __amplitude__ = Symbol('amplitude');
const __geometry__ = Symbol('geometry');
const __values__ = Symbol('values');
const __yOffset__ = Symbol('yOffset');

class Line extends THREE.Line {
  constructor(amplitude, yOffset, color, opacity) {
    let material = new THREE.LineBasicMaterial({
      linewidth: 2,
      color: color,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });

    let geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-1, yOffset, 0),
        new THREE.Vector3(0, yOffset, 0),
        new THREE.Vector3(1, yOffset, 0)
    );

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
    for (let i = 1; i < this[__geometry__].vertices.length - 1; i++) {
      this[__geometry__].vertices[i].y = this[__yOffset__] + newValues[i - 1] * this[__amplitude__];
    }
    this[__geometry__].verticesNeedUpdate = true;
  }
}

export default Line;
