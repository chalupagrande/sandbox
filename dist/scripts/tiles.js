'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var xmlns = 'http://www.w3.org/2000/svg';
var cfg = {
  boxsize: 50,
  h: 600,
  w: 600,
  speed: 0.2
};

var matrix = [];

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

//where startX & startY are an empty space that can be moved to
function start(startX, startY, cycles) {
  set(startX, startY, 0);
  var x = startX,
      y = startY,
      i = 0;

  for (i; i < cycles; i++) {
    var _findMoveableTilePosi = findMoveableTilePosition(x, y),
        _findMoveableTilePosi2 = _slicedToArray(_findMoveableTilePosi, 2),
        nx = _findMoveableTilePosi2[0],
        ny = _findMoveableTilePosi2[1];

    set(nx, ny, 0);
    set(x, y, i + 1);

    x = nx;
    y = ny;
  }
}

function setup() {
  var svg = document.querySelector('svg');
  svg.setAttribute('width', cfg.w);
  svg.setAttribute('height', cfg.h);

  var cellsX = cfg.w / cfg.boxsize,
      cellsY = cfg.h / cfg.boxsize,
      numBlocks = cellsX * cellsY,
      colorStep = 255 / numBlocks,
      i = 0;

  for (var x = 0; x < cellsX; x++) {
    matrix.push([]);
    for (var y = 0; y < cellsY; y++) {

      var el = document.createElementNS(xmlns, 'rect');
      el.setAttribute('width', cfg.boxsize);
      el.setAttribute('height', cfg.boxsize);
      el.setAttribute('x', x * cfg.boxsize);
      el.setAttribute('y', y * cfg.boxsize);
      el.style.fill = 'hsla(' + colorStep * i + ', 100%, 50%, 1)';

      svg.appendChild(el);

      matrix[x].push(el);
      i++;
    }
  }
  return matrix;
}

setup();
animate(new TimelineLite(), 6, 6, 10000);

function findMovementDirection(curX, curY, emptyX, emptyY) {
  var x = void 0,
      y = void 0;
  if (emptyX == curX) x = 0;else x = emptyX < curX ? -1 : 1;
  if (emptyY == curY) y = 0;else y = emptyY < curY ? -1 : 1;
  return [x, y];
}

function animate(timeline, startX, startY, cycles) {
  //clear 1 square
  get(startX, startY).remove();
  set(startX, startY, 0);
  var x = startX,
      y = startY;
  for (var i = 0; i < cycles; i++) {
    // debugger;
    //change the matrix
    var _findMoveableTilePosi3 = findMoveableTilePosition(x, y),
        _findMoveableTilePosi4 = _slicedToArray(_findMoveableTilePosi3, 2),
        ox = _findMoveableTilePosi4[0],
        oy = _findMoveableTilePosi4[1];

    var temp = get(ox, oy);
    set(ox, oy, 0);
    set(x, y, temp);

    //animate
    var direction = findMovementDirection(ox, oy, x, y);
    var tl = new TimelineLite();
    timeline.add(tl.to(temp, cfg.speed, {
      x: '+= ' + cfg.boxsize * direction[0],
      y: '+= ' + cfg.boxsize * direction[1],
      ease: 'ease'
    }));
    x = ox;
    y = oy;
  }
}

// let tl = new TimelineLite({
//   overwrite: 'none'
// })
// let temp = get(4,4)
// console.log(temp.getBBox().x - 40)
// tl.to(temp,1, {
//   x: -40,
// }).to(temp,1, {
//   x: "+=40"
// })
// console.log(temp)