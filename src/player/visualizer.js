import Audio from './audio';
import Line from '../visualizer/line';
import WaveLine from '../visualizer/wave-line';

const __audio__ = Symbol('audio');
const __camera__ = Symbol('camera');
const __line__ = Symbol('line');
const __renderer__ = Symbol('renderer');
const __scene__ = Symbol('scene');
const __wave__ = Symbol('wave');

export class Ctrl {
  constructor($scope) {
    this[__scene__] = new THREE.Scene();
    this[__camera__] = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);

    this[__renderer__] = new THREE.WebGLRenderer({
      antialias: true
    });
    this[__renderer__].setSize(window.innerWidth, window.innerHeight);

    this[__audio__] = $scope.audio;
    this[__wave__] = new WaveLine(this[__audio__], 1, 200, 0.01);
    this[__line__] = new Line(this[__audio__], 0.25, 0, 0x00ff00, 1);

    this[__line__].populateScene(this[__scene__]);
    this[__wave__].populateScene(this[__scene__]);

    this[__audio__].start();
    this.render();
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this[__audio__].update();
    this[__wave__].update();
    this[__line__].update();
    this[__renderer__].render(this[__scene__], this[__camera__]);
  }

  decorateElement(element) {
    element.appendChild(this[__renderer__].domElement);
  }
}

export default angular.module('lyra.player.Visualizer', [])
    .directive('lyVisualizer', () => {
      return {
        controller: Ctrl,
        controllerAs: 'ctrl',
        restrict: 'E',
        scope: {
          'audio': '='
        },
        templateUrl: 'player/visualizer.ng',
        link(scope, element, attrs, ctrl) {
          ctrl.decorateElement(element.contents()[0]);
        },
      };
    });
