(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

var LINE_COUNT = 20;

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 3, 0, 0, 100);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var topLines = [];
for (var i = 0; i < LINE_COUNT; i++) {
  var line = new _line2['default']((LINE_COUNT - i) / LINE_COUNT, // amplitude
  i / LINE_COUNT * 3, // yOffset
  0x00ff00, 1 - i / LINE_COUNT);
  scene.add(line);
  topLines.push(line);
}

function render() {
  requestAnimationFrame(render);
  for (var _i = LINE_COUNT - 1; _i >= 0; _i--) {
    var nextLine = topLines[_i - 1];
    var nextLineValues = nextLine ? nextLine.values : [Math.random()];
    topLines[_i].values = nextLineValues;
  }
  renderer.render(scene, camera);
}
render();

},{"./line":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3NvZWQvcHJvai9ob21lc291bmQvcGxheWVyL2luZGV4LmpzIiwiL1VzZXJzL2dzb2VkL3Byb2ovaG9tZXNvdW5kL3BsYXllci9saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztvQkNBaUIsUUFBUTs7OztBQUV6QixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXRCLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFL0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDekMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRS9DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLE1BQUksSUFBSSxHQUFHLHNCQUNQLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQSxHQUFJLFVBQVU7QUFDN0IsR0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDO0FBQ2xCLFVBQVEsRUFDUixDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0FBQ3hCLE9BQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7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QUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO09BQy9GO0FBQ0QsVUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztLQUM5Qzs7O1NBcENHLElBQUk7R0FBUyxLQUFLLENBQUMsSUFBSTs7cUJBdUNkLElBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IExpbmUgZnJvbSAnLi9saW5lJztcblxuY29uc3QgTElORV9DT1VOVCA9IDIwO1xuXG5sZXQgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbmxldCBjYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAzLCAwLCAwLCAxMDApO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbmxldCB0b3BMaW5lcyA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCBMSU5FX0NPVU5UOyBpKyspIHtcbiAgbGV0IGxpbmUgPSBuZXcgTGluZShcbiAgICAgIChMSU5FX0NPVU5UIC0gaSkgLyBMSU5FX0NPVU5ULCAvLyBhbXBsaXR1ZGVcbiAgICAgIGkgLyBMSU5FX0NPVU5UICogMywgLy8geU9mZnNldFxuICAgICAgMHgwMGZmMDAsXG4gICAgICAxIC0gaSAvIExJTkVfQ09VTlQpO1xuICBzY2VuZS5hZGQobGluZSk7XG4gIHRvcExpbmVzLnB1c2gobGluZSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gIGZvciAobGV0IGkgPSBMSU5FX0NPVU5UIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsZXQgbmV4dExpbmUgPSB0b3BMaW5lc1tpIC0gMV07XG4gICAgbGV0IG5leHRMaW5lVmFsdWVzID0gbmV4dExpbmUgPyBuZXh0TGluZS52YWx1ZXMgOiBbTWF0aC5yYW5kb20oKV07XG4gICAgdG9wTGluZXNbaV0udmFsdWVzID0gbmV4dExpbmVWYWx1ZXM7XG4gIH1cbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxucmVuZGVyKCk7XG4iLCJjb25zdCBfX2FtcGxpdHVkZV9fID0gU3ltYm9sKCdhbXBsaXR1ZGUnKTtcbmNvbnN0IF9fZ2VvbWV0cnlfXyA9IFN5bWJvbCgnZ2VvbWV0cnknKTtcbmNvbnN0IF9fdmFsdWVzX18gPSBTeW1ib2woJ3ZhbHVlcycpO1xuY29uc3QgX195T2Zmc2V0X18gPSBTeW1ib2woJ3lPZmZzZXQnKTtcblxuY2xhc3MgTGluZSBleHRlbmRzIFRIUkVFLkxpbmUge1xuICBjb25zdHJ1Y3RvcihhbXBsaXR1ZGUsIHlPZmZzZXQsIGNvbG9yLCBvcGFjaXR5KSB7XG4gICAgbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGxpbmV3aWR0aDogMixcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgbGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgZ2VvbWV0cnkudmVydGljZXMucHVzaChcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsIHlPZmZzZXQsIDApLFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCB5T2Zmc2V0LCAwKSxcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMSwgeU9mZnNldCwgMClcbiAgICApO1xuXG4gICAgc3VwZXIoZ2VvbWV0cnksIG1hdGVyaWFsKTtcblxuICAgIHRoaXNbX19hbXBsaXR1ZGVfX10gPSBhbXBsaXR1ZGU7XG4gICAgdGhpc1tfX3ZhbHVlc19fXSA9IDA7XG4gICAgdGhpc1tfX3lPZmZzZXRfX10gPSB5T2Zmc2V0O1xuICAgIHRoaXNbX19nZW9tZXRyeV9fXSA9IGdlb21ldHJ5O1xuICB9XG5cbiAgZ2V0IHZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpc1tfX3ZhbHVlc19fXTtcbiAgfVxuXG4gIHNldCB2YWx1ZXMobmV3VmFsdWVzKSB7XG4gICAgdGhpc1tfX3ZhbHVlc19fXSA9IG5ld1ZhbHVlcztcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXNbX19nZW9tZXRyeV9fXS52ZXJ0aWNlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHRoaXNbX19nZW9tZXRyeV9fXS52ZXJ0aWNlc1tpXS55ID0gdGhpc1tfX3lPZmZzZXRfX10gKyBuZXdWYWx1ZXNbaSAtIDFdICogdGhpc1tfX2FtcGxpdHVkZV9fXTtcbiAgICB9XG4gICAgdGhpc1tfX2dlb21ldHJ5X19dLnZlcnRpY2VzTmVlZFVwZGF0ZSA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZTtcbiJdfQ==
