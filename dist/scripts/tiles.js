"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var xmlns = 'http://www.w3.org/2000/svg';
var cfg = {
  boxsize: 100,
  h: 600,
  w: 600,
  delay: 300 };

var picasso = ["http://www.pablopicasso.org/images/paintings/self-portrait.jpg", "http://www.pablopicasso.org/images/paintings/blue-nude.jpg", "http://www.pablopicasso.org/images/paintings/the-old-guitarist.jpg", "http://www.pablopicasso.org/images/paintings/boy-with-pipe.jpg", "http://www.pablopicasso.org/images/paintings/boy-leading-a-horse.jpg", "http://www.pablopicasso.org/images/paintings/avignon.jpg", "http://www.pablopicasso.org/images/paintings/maternity.jpg", "http://www.pablopicasso.org/images/paintings/girl-with-mandolin.jpg", "http://www.pablopicasso.org/images/paintings/portrait-of-ambroise-vollard.jpg", "http://www.pablopicasso.org/images/paintings/ma-jolie.jpg", "http://www.pablopicasso.org/images/paintings/bathers.jpg", "http://www.pablopicasso.org/images/paintings/three-musicians.jpg", "http://www.pablopicasso.org/images/paintings/two-women-running-on-the-beach.jpg", "http://www.pablopicasso.org/images/paintings/three-dancers.jpg", "http://www.pablopicasso.org/images/paintings/woman-in-an-armchair.jpg", "http://www.pablopicasso.org/images/paintings/crucifixion.jpg", "http://www.pablopicasso.org/images/paintings/figures-at-the-seaside.jpg", "http://www.pablopicasso.org/images/paintings/girl-before-a-mirror.jpg", "http://www.pablopicasso.org/images/paintings/the-dream.jpg", "http://www.pablopicasso.org/images/paintings/nude-green-leaves-and-bust.jpg", "http://www.pablopicasso.org/images/paintings/woman-with-a-flower.jpg", "http://www.pablopicasso.org/images/paintings/bull-fight.jpg", "http://www.pablopicasso.org/images/paintings/guernica.jpg", "http://www.pablopicasso.org/images/paintings/the-weeping-woman.jpg", "http://www.pablopicasso.org/images/paintings/seated-woman.jpg", "http://www.pablopicasso.org/images/paintings/maya-with-her-doll.jpg", "http://www.pablopicasso.org/images/paintings/dora-maar-au-chat.jpg", "http://www.pablopicasso.org/images/paintings/joie-de-vivre.jpg", "http://www.pablopicasso.org/images/paintings/massacre-in-korea.jpg", "http://www.pablopicasso.org/images/paintings/mediterranean-landscape.jpg", "http://www.pablopicasso.org/images/paintings/jacqueline-with-flowers.jpg", "http://www.pablopicasso.org/images/paintings/don-quixote.jpg", "http://www.pablopicasso.org/images/paintings/the-studio-at-la-californie.jpg", "http://www.pablopicasso.org/images/paintings/girl-in-a-chemise.jpg", "http://www.pablopicasso.org/images/paintings/harlequin-with-glass.jpg", "http://www.pablopicasso.org/images/paintings/la-lecture.jpg"];

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

      var defs = document.querySelector('defs');
      var mask = document.createElementNS(xmlns, 'mask');
      mask.setAttribute('id', "mask-" + x + "-" + y);
      defs.appendChild(mask);
      var rect = document.createElementNS(xmlns, 'rect');
      rect.setAttribute('width', cfg.boxsize);
      rect.setAttribute('height', cfg.boxsize);
      rect.setAttribute('x', x * cfg.boxsize);
      rect.setAttribute('y', y * cfg.boxsize);
      rect.style.fill = "white";

      mask.appendChild(rect);
      var image = document.createElementNS(xmlns, 'image');
      image.setAttribute('href', picasso[i]);
      image.setAttribute('width', cfg.w);
      image.setAttribute('height', cfg.h);
      image.setAttribute('mask', "url(#mask-" + x + "-" + y + ")");
      svg.appendChild(image);

      //<image xlink:href="../resources/basquiat/1.jpg" width="600" height="600"  alt="" height='600' width='600' mask="url(#mask-4-1)"></image>


      // colored squares
      // let el = document.createElementNS(xmlns, 'rect')
      //     el.setAttribute('class', 'tile')
      //     el.setAttribute('width', cfg.boxsize)
      //     el.setAttribute('height', cfg.boxsize)
      //     el.setAttribute('x', x * cfg.boxsize)
      //     el.setAttribute('y', y * cfg.boxsize)
      //     el.style.fill = `hsla(${i * colorStep}, 100%, 50%, 1)`

      // svg.appendChild(el)
      matrix[x].push({
        el: rect,
        // el: el,
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