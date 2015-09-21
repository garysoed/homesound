import Line from './line';

describe('line', () => {
  describe('set values', () => {
    it('should update the vertices', () => {
      let line = new Line(2 /* amplitude */, 1 /* yOffset */, 0xffffff, 0.4);
      line.values = [0.5];
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(1, 1, 0)
      ]);
    });
  });
});
