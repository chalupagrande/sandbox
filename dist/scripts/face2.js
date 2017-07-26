'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
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

function setup() {
  var polys = document.querySelectorAll('polygon,polyline');
  [].forEach.call(polys, convertPolyToPath);
  var paths = [].concat(_toConsumableArray(document.querySelectorAll('path')));
  paths.forEach(function (path, i) {

    var fill = path.getAttribute('fill');
    fill = fill || path.getAttribute('style').slice(-7);
    var rgb = hexToRGB(fill);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    path.setAttribute('fill', 'hsl(' + Math.round(Math.random() * 255) + ', ' + Math.round(hsl.s * 100) + '%, ' + Math.round(hsl.l * 100) + '% )');
  });
}
setup();

/*
w3schools
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function rgbToHsl(r, g, b) {
  var min,
      max,
      i,
      l,
      s,
      maxcolor,
      h,
      rgb = [];
  rgb[0] = r / 255;
  rgb[1] = g / 255;
  rgb[2] = b / 255;
  min = rgb[0];
  max = rgb[0];
  maxcolor = 0;
  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) {
      min = rgb[i + 1];
    }
    if (rgb[i + 1] >= max) {
      max = rgb[i + 1];maxcolor = i + 1;
    }
  }
  if (maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (isNaN(h)) {
    h = 0;
  }
  h = h * 60;
  if (h < 0) {
    h = h + 360;
  }
  l = (min + max) / 2;
  if (min == max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  s = s;
  return { h: h, s: s, l: l };
}