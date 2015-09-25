import Audio from './audio';
import Globals from './globals';
import Line from './line';

let scene = new THREE.Scene();
let camera = new THREE.OrthographicCamera(-1, 1, 5, -5, 0, 100);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let audio = new Audio('player/02 Complicated.mp3');
let line = new Line(
    audio,
    1, // amplitude
    0, // yOffset
    0x00ff00,
    1); // opacity
scene.add(line);

audio.start();
let lastUpdateTimestamp = Date.now();

function render() {
  requestAnimationFrame(render);
  audio.update();
  line.update();
  renderer.render(scene, camera);
}
render();
