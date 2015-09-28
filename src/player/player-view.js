import Audio from './audio';
import UpdateLoop from '../utils/update-loop';
import Verse from '../model/verse';
import VerseRender from '../lyric/verse-render';
import Visualizer from './visualizer';

const __audio__ = Symbol('audio');
const __updateLoop__ = Symbol('updateLoop');
const __verse__ = Symbol('verse');

export class Ctrl {
  constructor($scope) {
    this[__audio__] = new Audio('player/sample.mp3')
    this[__verse__] = new Verse(1, 4, 'blah', 'Hello Lyra!!!');
    this[__updateLoop__] = new UpdateLoop();
    this[__updateLoop__].start();
    this[__audio__].start();
  }

  get audio() {
    return this[__audio__];
  }

  get verse() {
    return this[__verse__];
  }

  get updateLoop() {
    return this[__updateLoop__];
  }

  toggleAudio() {
    this[__audio__].toggle();
  }

}

export default angular
    .module('lyra.player.PlayerView', [
      'ngRoute',
      VerseRender.name,
      Visualizer.name
    ])
    .config(['$routeProvider', $routeProvider => {
      $routeProvider.when('/', {
        templateUrl: 'player/player-view.ng',
        controller: Ctrl,
        controllerAs: 'ctrl'
      });
    }]);
