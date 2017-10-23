'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var xmlns = 'http://www.w3.org/2000/svg';
var cfg = {
  boxsize: 200,
  h: 1800,
  w: 1200,
  dx: 0,
  dy: 0,
  delay: 300 };

var matrix = [];

setup();
animate(0, 0);

function createMatrix() {
  var cellsX = cfg.w / cfg.boxsize,
      cellsY = cfg.h / cfg.boxsize;

  for (var x = 0; x < cellsX; x++) {
    matrix.push([]);
    for (var y = 0; y < cellsY; y++) {
      matrix[x].push(1);
    }
  }
  return matrix;
}

function findMoveableTilePosition(x, y) {
  var pos = [];
  var a = [x, y - 1],
      b = [x, y + 1],
      c = [x + 1, y],
      d = [x - 1, y];

  if (!!get.apply(undefined, a)) pos.push([x, y - 1]);
  if (!!get.apply(undefined, b)) pos.push([x, y + 1]);
  if (!!get.apply(undefined, c)) pos.push([x + 1, y]);
  if (!!get.apply(undefined, d)) pos.push([x - 1, y]);
  return pos[Math.floor(Math.random() * pos.length)];
}

function isValid(x, y) {
  return x != undefined && y != undefined && x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
}
function get(x, y) {
  if (!isValid(x, y)) return false;
  return matrix[x][y];
}
function set(x, y, value) {
  return matrix[x][y] = value;
}

function findFreePosition(x, y) {
  var pos = [];
  var a = [x, y - 1],
      b = [x, y + 1],
      c = [x + 1, y],
      d = [x - 1, y];

  if (isValid.apply(undefined, a) && !get.apply(undefined, a)) pos.push(a);
  if (isValid.apply(undefined, b) && !get.apply(undefined, b)) pos.push(b);
  if (isValid.apply(undefined, c) && !get.apply(undefined, c)) pos.push(c);
  if (isValid.apply(undefined, d) && !get.apply(undefined, d)) pos.push(d);
  return pos[Math.floor(Math.random() * pos.length)];
}

function setup() {
  var tiles = document.querySelector('g#tiles');
  // tiles.setAttribute('width', cfg.w)
  // tiles.setAttribute('height', cfg.h)
  tiles.setAttribute('transform', 'translate(' + cfg.dx + ' ' + cfg.dy + ')');
  tiles.setAttribute('mask', 'url(#all)');

  var cellsX = cfg.w / cfg.boxsize,
      cellsY = cfg.h / cfg.boxsize,
      numBlocks = cellsX * cellsY,
      colorStep = 255 / numBlocks,
      i = 0;

  for (var x = 0; x < cellsX; x++) {
    matrix.push([]);
    for (var y = 0; y < cellsY; y++) {
      // colored squares
      var el = document.createElementNS(xmlns, 'rect');
      el.setAttribute('class', 'tile');
      el.setAttribute('width', cfg.boxsize);
      el.setAttribute('height', cfg.boxsize);
      el.setAttribute('x', x * cfg.boxsize);
      el.setAttribute('y', y * cfg.boxsize);
      el.style.fill = 'hsla(' + i * colorStep + ', 100%, 50%, 1)';

      tiles.appendChild(el);
      matrix[x].push({
        el: el,
        x: 0,
        y: 0
      });
      i++;
    }
  }
  return matrix;
}

function findMovementDirection(curX, curY, emptyX, emptyY) {
  var x = void 0,
      y = void 0;
  if (emptyX == curX) x = 0;else x = emptyX < curX ? -1 : 1;
  if (emptyY == curY) y = 0;else y = emptyY < curY ? -1 : 1;
  return [x, y];
}

function animate(startX, startY) {

  //clear 1 square
  get(startX, startY).el.remove();
  set(startX, startY, 0);
  var x = startX,
      y = startY;

  var step = function step() {
    setTimeout(function () {
      //change the matrix
      var _findMoveableTilePosi = findMoveableTilePosition(x, y),
          _findMoveableTilePosi2 = _slicedToArray(_findMoveableTilePosi, 2),
          ox = _findMoveableTilePosi2[0],
          oy = _findMoveableTilePosi2[1];

      var obj = get(ox, oy);
      var temp = obj.el;
      set(ox, oy, 0);

      //animate
      var direction = findMovementDirection(ox, oy, x, y);
      var nx = obj.x + cfg.boxsize * direction[0];
      var ny = obj.y + cfg.boxsize * direction[1];

      // temp.style.transform = `translate(${obj.x + direction[0] * cfg.boxsize}px, ${obj.y + direction[1] * cfg.boxsize}px)`
      TweenMax.to(temp, cfg.delay / 1000, {
        x: obj.x + direction[0] * cfg.boxsize,
        y: obj.y + direction[1] * cfg.boxsize
      });

      obj.x = nx;
      obj.y = ny;
      set(x, y, obj);
      x = ox;
      y = oy;

      requestAnimationFrame(step);
    }, cfg.delay);
  };
  step();
}