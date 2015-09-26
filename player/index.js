import Audio from './audio';
import Globals from './globals';
import WaveLine from './effects/wave-line';

let scene = new THREE.Scene();
let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);

let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let audio = new Audio('player/sample.mp3');
let wave = new WaveLine(audio, 4);
wave.populateScene(scene);

audio.start();
let lastUpdateTimestamp = Date.now();

function render() {
  requestAnimationFrame(render);
  audio.update();
  wave.update();
  renderer.render(scene, camera);
}
render();
