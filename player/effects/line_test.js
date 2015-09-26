import Line from './line';

describe('Line', () => {
  describe('update', () => {
    it('should update the vertices', () => {
      let audio = {
        timeDomainData: [0.5, 0.25],
        dataCount: 2
      };
      let line = new Line(
          audio, 2 /* amplitude */, 1 /* yOffset */, 0xffffff /* color */, 0.4 /* opacity */);
      line.update();
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(-0.5, 1.5, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0.5, 1.5, 0),
        new THREE.Vector3(1, 1, 0)
      ]);
    });
  });
});
