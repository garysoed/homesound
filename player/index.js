import Line from './line';

const LINE_COUNT = 20;

let scene = new THREE.Scene();
let camera = new THREE.OrthographicCamera(-1, 1, 3, 0, 0, 100);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let topLines = [];
for (var i = 0; i < LINE_COUNT; i++) {
  let line = new Line(
      (LINE_COUNT - i) / LINE_COUNT, // amplitude
      i / LINE_COUNT * 3, // yOffset
      0x00ff00,
      1 - i / LINE_COUNT);
  scene.add(line);
  topLines.push(line);
}

function render() {
  requestAnimationFrame(render);
  for (let i = LINE_COUNT - 1; i >= 0; i--) {
    let nextLine = topLines[i - 1];
    let nextLineValues = nextLine ? nextLine.values : [Math.random()];
    topLines[i].values = nextLineValues;
  }
  renderer.render(scene, camera);
}
render();
