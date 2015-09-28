import Audio from './audio';
import Visualizer from './visualizer';

const __audio__ = Symbol('audio');

export class Ctrl {
  constructor($scope) {
    this[__audio__] = new Audio('player/sample.mp3')
  }

  get audio() {
    return this[__audio__];
  }
}

export default angular
    .module('lyra.player.PlayerView', [
      'ngRoute',
      Visualizer.name
    ])
    .config(['$routeProvider', $routeProvider => {
      $routeProvider.when('/', {
        templateUrl: 'player/player-view.ng',
        controller: Ctrl,
        controllerAs: 'ctrl'
      });
    }]);
