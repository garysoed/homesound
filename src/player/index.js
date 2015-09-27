import Audio from './audio';
import Globals from './globals';
import Line from '../visualizer/line';
import WaveLine from '../visualizer/wave-line';

angular.module('lyra.PlayerApp', ['ng'])
    .run(() => {
      let scene = new THREE.Scene();
      let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);

      let renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      let audio = new Audio('player/sample.mp3');
      let wave = new WaveLine(audio, 1, 200, 0.01);
      let line = new Line(audio, 0.25, 0, 0x00ff00, 1);
      line.populateScene(scene);
      wave.populateScene(scene);

      audio.start();
      let lastUpdateTimestamp = Date.now();

      function render() {
        requestAnimationFrame(render);
        audio.update();
        wave.update();
        line.update();
        renderer.render(scene, camera);
      }
      render();
    });
