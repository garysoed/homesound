import Updateable from '../utils/updateable';
import UpdateLoop from '../utils/update-loop';

const __$scope__ = Symbol('$scope');
const __audio__ = Symbol('audio');
const __verse__ = Symbol('verse');

export class Ctrl extends Updateable {
  constructor($scope) {
    super();
    this[__$scope__] = $scope;
    this[__audio__] = $scope.audio;
    this[__verse__] = $scope.verse;

    $scope.updateLoop.addChild(this);
    this.isActive = false;
  }

  updateInternal() {
    let audioTime = this[__audio__].currentTime;
    if (audioTime > this[__verse__].startTime && audioTime < this[__verse__].endTime) {
      this[__$scope__].$apply(() => {});
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  get percent() {
    let percentage = (this[__audio__].currentTime - this[__verse__].startTime) /
        (this[__verse__].endTime - this[__verse__].startTime) * 100;
    return Math.max(Math.min(percentage, 100), 0);
  }

  get text() {
    return this[__verse__].text;
  }

  // TODO(gs): Use dynamic color.
  get highlightColor() {
    return '#388E3C';
  }

  get unhighlightColor() {
    return '#C8E6C9';
  }
}

export default angular.module('lyric.VerseRender', ['ng'])
    .directive('lyVerseRender', () => {
      return {
        controller: Ctrl,
        controllerAs: 'ctrl',
        restrict: 'E',
        scope: {
          'audio': '=',
          'updateLoop': '=',
          'verse': '='
        },
        templateUrl: 'lyric/verse-render.ng'
      };
    });
