'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var polys = document.querySelectorAll('polygon,polyline');
[].forEach.call(polys, convertPolyToPath);

var master = new TimelineMax({
  overwrite: true
});

var paths = [].concat(_toConsumableArray(document.querySelectorAll('path')));
var easeFunc = BezierEasing(0, 1, 0.2, 1);

paths.forEach(function (el, i) {
  var _TweenMax$fromTo, _TweenMax$fromTo2;

  // el.addEventListener('mouseenter', (event)=>{
  //   event.target.style.fillOpacity = 0
  // })
  // el.addEventListener('mouseleave', (event)=>{
  //   event.target.style.fillOpacity = 1
  // })

  master.add(TweenMax.fromTo(el, 1 - easeFunc(i / paths.length), (_TweenMax$fromTo = {
    drawSVG: '0%',
    'stroke': 'black',
    'stroke-width': 1
  }, _defineProperty(_TweenMax$fromTo, 'stroke-width', 1), _defineProperty(_TweenMax$fromTo, 'stroke-opacity', 1), _TweenMax$fromTo), (_TweenMax$fromTo2 = {
    drawSVG: '100%',
    'stroke': 'black',
    'stroke-width': 1
  }, _defineProperty(_TweenMax$fromTo2, 'stroke-width', 1), _defineProperty(_TweenMax$fromTo2, 'stroke-opacity', 1), _TweenMax$fromTo2)));
  master.add(TweenMax.fromTo(el, 1 - easeFunc(i / paths.length), {
    'fill-opacity': 0,
    'stroke-opacity': 1
  }, {
    drawSVG: '100%',
    'stroke-opacity': 0,
    'fill-opacity': 1
  }));
});

/* Helpers
~~~~~~~~~~~~~~~~ */

// regular cosine easing
function getEaseTimings(initial, steps, easeType) {
  var interval = Math.PI / steps,
      result = [];

  for (var i = 0; i < steps; i++) {
    var m = Math.abs(Math.cos(interval * i));
    result.push(m * initial);
  }
  return result;
}

function convertPolyToPath(poly) {
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS, 'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var x0 = points.shift(),
      y0 = points.shift();
  var pathdata = 'M' + x0 + ',' + y0 + 'L' + points.join(' ');
  if (poly.tagName == 'polygon') pathdata += 'z';
  path.setAttribute('d', pathdata);
  path.setAttribute('fill', poly.getAttribute('style').split(': ')[1]);
  poly.parentNode.replaceChild(path, poly);
}