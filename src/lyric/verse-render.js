import Ctrl from './verse-render-ctrl';

let Module = angular.module('lyric.VerseRender', ['ng'])
    .directive('lyVerseRender', () => {
      controller: Ctrl,
      controllerAs: 'ctrl',
      restrict: 'E',
      scope: {
        'verse': '='
      },
      templateUrl: 'lyric/verse-render.ng'
    });

export default Module;
