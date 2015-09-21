(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __amplitude__ = Symbol('amplitude');
var __geometry__ = Symbol('geometry');
var __values__ = Symbol('values');
var __yOffset__ = Symbol('yOffset');

var Line = (function (_THREE$Line) {
  _inherits(Line, _THREE$Line);

  function Line(amplitude, yOffset, color, opacity) {
    _classCallCheck(this, Line);

    var material = new THREE.LineBasicMaterial({
      linewidth: 2,
      color: color,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-1, yOffset, 0), new THREE.Vector3(0, yOffset, 0), new THREE.Vector3(1, yOffset, 0));

    _get(Object.getPrototypeOf(Line.prototype), 'constructor', this).call(this, geometry, material);

    this[__amplitude__] = amplitude;
    this[__values__] = 0;
    this[__yOffset__] = yOffset;
    this[__geometry__] = geometry;
  }

  _createClass(Line, [{
    key: 'values',
    get: function get() {
      return this[__values__];
    },
    set: function set(newValues) {
      this[__values__] = newValues;
      for (var i = 1; i < this[__geometry__].vertices.length - 1; i++) {
        this[__geometry__].vertices[i].y = this[__yOffset__] + newValues[i - 1] * this[__amplitude__];
      }
      this[__geometry__].verticesNeedUpdate = true;
    }
  }]);

  return Line;
})(THREE.Line);

exports['default'] = Line;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

describe('line', function () {
  describe('set values', function () {
    it('should update the vertices', function () {
      var line = new _line2['default'](2, /* amplitude */1, /* yOffset */0xffffff, 0.4);
      line.values = [0.5];
      expect(getPrivateProperty(line, 'geometry').vertices).toEqual([new THREE.Vector3(-1, 1, 0), new THREE.Vector3(0, 2, 0), new THREE.Vector3(1, 1, 0)]);
    });
  });
});

},{"./line":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3NvZWQvcHJvai9ob21lc291bmQvcGxheWVyL2xpbmUuanMiLCIvVXNlcnMvZ3NvZWQvcHJvai9ob21lc291bmQvcGxheWVyL2xpbmVfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUVoQyxJQUFJO1lBQUosSUFBSTs7QUFDRyxXQURQLElBQUksQ0FDSSxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7MEJBRDVDLElBQUk7O0FBRU4sUUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUM7QUFDekMsZUFBUyxFQUFFLENBQUM7QUFDWixXQUFLLEVBQUUsS0FBSztBQUNaLGFBQU8sRUFBRSxPQUFPO0FBQ2hCLGNBQVEsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO0FBQ2hDLGVBQVMsRUFBRSxLQUFLO0FBQ2hCLGlCQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFDLENBQUM7O0FBRUgsUUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDcEMsWUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2xCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQ2pDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUNoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FDbkMsQ0FBQzs7QUFFRiwrQkFsQkUsSUFBSSw2Q0FrQkEsUUFBUSxFQUFFLFFBQVEsRUFBRTs7QUFFMUIsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUNoQyxRQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDNUIsUUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQztHQUMvQjs7ZUF4QkcsSUFBSTs7U0EwQkUsZUFBRztBQUNYLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pCO1NBRVMsYUFBQyxTQUFTLEVBQUU7QUFDcEIsVUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUM3QixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9ELFlBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztPQUMvRjtBQUNELFVBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7S0FDOUM7OztTQXBDRyxJQUFJO0dBQVMsS0FBSyxDQUFDLElBQUk7O3FCQXVDZCxJQUFJOzs7Ozs7OztvQkM1Q0YsUUFBUTs7OztBQUV6QixRQUFRLENBQUMsTUFBTSxFQUFFLFlBQU07QUFDckIsVUFBUSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQzNCLE1BQUUsQ0FBQyw0QkFBNEIsRUFBRSxZQUFNO0FBQ3JDLFVBQUksSUFBSSxHQUFHLHNCQUFTLENBQUMsaUJBQWtCLENBQUMsZUFBZ0IsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLFVBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixZQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUM1RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUMzQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzNCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBfX2FtcGxpdHVkZV9fID0gU3ltYm9sKCdhbXBsaXR1ZGUnKTtcbmNvbnN0IF9fZ2VvbWV0cnlfXyA9IFN5bWJvbCgnZ2VvbWV0cnknKTtcbmNvbnN0IF9fdmFsdWVzX18gPSBTeW1ib2woJ3ZhbHVlcycpO1xuY29uc3QgX195T2Zmc2V0X18gPSBTeW1ib2woJ3lPZmZzZXQnKTtcblxuY2xhc3MgTGluZSBleHRlbmRzIFRIUkVFLkxpbmUge1xuICBjb25zdHJ1Y3RvcihhbXBsaXR1ZGUsIHlPZmZzZXQsIGNvbG9yLCBvcGFjaXR5KSB7XG4gICAgbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGxpbmV3aWR0aDogMixcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgbGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgZ2VvbWV0cnkudmVydGljZXMucHVzaChcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsIHlPZmZzZXQsIDApLFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCB5T2Zmc2V0LCAwKSxcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMSwgeU9mZnNldCwgMClcbiAgICApO1xuXG4gICAgc3VwZXIoZ2VvbWV0cnksIG1hdGVyaWFsKTtcblxuICAgIHRoaXNbX19hbXBsaXR1ZGVfX10gPSBhbXBsaXR1ZGU7XG4gICAgdGhpc1tfX3ZhbHVlc19fXSA9IDA7XG4gICAgdGhpc1tfX3lPZmZzZXRfX10gPSB5T2Zmc2V0O1xuICAgIHRoaXNbX19nZW9tZXRyeV9fXSA9IGdlb21ldHJ5O1xuICB9XG5cbiAgZ2V0IHZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpc1tfX3ZhbHVlc19fXTtcbiAgfVxuXG4gIHNldCB2YWx1ZXMobmV3VmFsdWVzKSB7XG4gICAgdGhpc1tfX3ZhbHVlc19fXSA9IG5ld1ZhbHVlcztcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXNbX19nZW9tZXRyeV9fXS52ZXJ0aWNlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHRoaXNbX19nZW9tZXRyeV9fXS52ZXJ0aWNlc1tpXS55ID0gdGhpc1tfX3lPZmZzZXRfX10gKyBuZXdWYWx1ZXNbaSAtIDFdICogdGhpc1tfX2FtcGxpdHVkZV9fXTtcbiAgICB9XG4gICAgdGhpc1tfX2dlb21ldHJ5X19dLnZlcnRpY2VzTmVlZFVwZGF0ZSA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZTtcbiIsImltcG9ydCBMaW5lIGZyb20gJy4vbGluZSc7XG5cbmRlc2NyaWJlKCdsaW5lJywgKCkgPT4ge1xuICBkZXNjcmliZSgnc2V0IHZhbHVlcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgdmVydGljZXMnLCAoKSA9PiB7XG4gICAgICBsZXQgbGluZSA9IG5ldyBMaW5lKDIgLyogYW1wbGl0dWRlICovLCAxIC8qIHlPZmZzZXQgKi8sIDB4ZmZmZmZmLCAwLjQpO1xuICAgICAgbGluZS52YWx1ZXMgPSBbMC41XTtcbiAgICAgIGV4cGVjdChnZXRQcml2YXRlUHJvcGVydHkobGluZSwgJ2dlb21ldHJ5JykudmVydGljZXMpLnRvRXF1YWwoW1xuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtMSwgMSwgMCksXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDIsIDApLFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAwKVxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=
