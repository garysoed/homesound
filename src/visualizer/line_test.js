import Line from './line';

describe('Line', () => {
  let audio;
  let line;

  beforeEach(() => {
    audio = {
      timeDomainData: [0.5, 0.25],
      dataCount: 2
    };
    line = new Line(
        audio, 2 /* amplitude */, 1 /* yOffset */, 0xffffff /* color */, 0.4 /* opacity */);
  })

  describe('update', () => {
    it('should update the vertices', () => {
      line.updateInternal();
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(-0.5, 1.5, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0.5, 1.5, 0),
        new THREE.Vector3(1, 1, 0)
      ]);
    });
  });

  describe('get x', () => {
    it('should return the mid x coordinate', () => {
      let vertices = getPrivateProperty(line, 'geometry').vertices;
      expect(line.x).toEqual((vertices[0].x + vertices[4].x) / 2);
    });
  });

  describe('set x', () => {
    it('should update the entire geometry while keeping its shape', () => {
      line.updateInternal();
      line.x = 3;
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([
        new THREE.Vector3(2, 1, 0),
        new THREE.Vector3(2.5, 1.5, 0),
        new THREE.Vector3(3, 2, 0),
        new THREE.Vector3(3.5, 1.5, 0),
        new THREE.Vector3(4, 1, 0)
      ]);
    });
  });

  describe('get y', () => {
    it('should return the y coordinate of the first and last point on the line', () => {
      let vertices = getPrivateProperty(line, 'geometry').vertices;
      expect(line.y).toEqual(vertices[0].y);
      expect(line.y).toEqual(vertices[4].y);
    });
  });

  describe('set y', () => {
    it('should update the entire geometry while keeping its shape', () => {
      line.updateInternal();
      line.y = 3;
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([
        new THREE.Vector3(-1, 3, 0),
        new THREE.Vector3(-0.5, 3.5, 0),
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(0.5, 3.5, 0),
        new THREE.Vector3(1, 3, 0)
      ]);
    });
  });
});
