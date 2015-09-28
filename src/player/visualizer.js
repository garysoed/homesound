import Audio from './audio';
import Line from '../visualizer/line';
import Updateable from '../utils/updateable';
import UpdateLoop from '../utils/update-loop';
import WaveLine from '../visualizer/wave-line';

const __camera__ = Symbol('camera');
const __renderer__ = Symbol('renderer');
const __scene__ = Symbol('scene');
const __updateLoop__ = Symbol('updateLoop');

export class Ctrl extends Updateable {
  constructor($scope) {
    super();
    this[__scene__] = new THREE.Scene();
    this[__camera__] = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);

    this[__renderer__] = new THREE.WebGLRenderer({
      antialias: true
    });
    this[__renderer__].setSize(window.innerWidth, window.innerHeight);

    let audio = $scope.audio;
    let wave = new WaveLine(audio, 1, 200, 0.01);
    let line = new Line(audio, 0.25, 0, 0x00ff00, 1);

    line.populateScene(this[__scene__]);
    wave.populateScene(this[__scene__]);

    let updateLoop = $scope.updateLoop;
    updateLoop.addChild(audio);
    updateLoop.addChild(wave);
    updateLoop.addChild(line);
    updateLoop.addChild(this);
  }

  updateInternal() {
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
          'audio': '=',
          'updateLoop': '='
        },
        templateUrl: 'player/visualizer.ng',
        link(scope, element, attrs, ctrl) {
          ctrl.decorateElement(element.contents()[0]);
        },
      };
    });
