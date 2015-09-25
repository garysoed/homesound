import Line from './line';

describe('Line', () => {
  describe('update', () => {
    it('should update the vertices', () => {
      let audio = {
        frequencyData: [0.5, 0.25],
        valuesCount: 2
      };
      let line = new Line(
          audio, 2 /* amplitude */, 1 /* yOffset */, 0xffffff /* color */, 0.4 /* opacity */);
      line.update();
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(-0.5, 0.5, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0.5, 0.5, 0),
        new THREE.Vector3(1, 1, 0)
      ]);
    });
  });
});
