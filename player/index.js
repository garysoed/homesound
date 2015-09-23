import Audio from './audio';
import Globals from './globals';
import Line from './line';

let scene = new THREE.Scene();
let camera = new THREE.OrthographicCamera(-1, 1, 5, -5, 0, 100);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let topLines = [];
for (var i = 0; i < Globals.LINE_COUNT; i++) {
  let line = new Line(
      Globals.SAMPLE_POINTS,
      (Globals.LINE_COUNT - i) / Globals.LINE_COUNT, // amplitude
      i / Globals.LINE_COUNT * 5, // yOffset
      0x00ff00,
      1 - i / Globals.LINE_COUNT);
  scene.add(line);
  topLines.push(line);
}

let audio = new Audio('player/02 Complicated.mp3');
audio.start();
let lastUpdateTimestamp = Date.now();

function render() {
  requestAnimationFrame(render);

  let frequencyData = audio.currentFrequencyData;
  let normalizedData = [];
  for (let i = 0; i < frequencyData.length; i++) {
    normalizedData[i] = (frequencyData[i] - 0) / 256;
  }

  let now = Date.now();
  if (now - lastUpdateTimestamp > Globals.UPDATE_DELAY_MS) {
    for (let i = Globals.LINE_COUNT - 1; i >= 0; i--) {
      let nextLine = topLines[i - 1];
      let nextLineValues = nextLine ? nextLine.values : normalizedData;
      topLines[i].values = nextLineValues;
    }
    lastUpdateTimestamp = now;
  } else {
    topLines[0].values = normalizedData;
  }
  renderer.render(scene, camera);
}
render();
