"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var xmlns = 'http://www.w3.org/2000/svg';
var cfg = {
  boxsize: 50,
  h: 300,
  w: 300,
  delay: 300 };

var picasso = ["https://upload.wikimedia.org/wikipedia/en/8/8d/Pablo_Picasso,_1905,_Au_Lapin_Agile_(At_the_Lapin_Agile),_oil_on_canvas,_99.1_x_100.3_cm,_Metropolitan_Museum_of_Art.jpg", "https://www.vanartgallery.bc.ca/the_exhibitions/images/picasso.jpg", "https://uploads2.wikiart.org/images/pablo-picasso/self-portrait-1907.jpg", "https://upload.wikimedia.org/wikipedia/en/1/1c/Pablo_Picasso,_1910,_Girl_with_a_Mandolin_(Fanny_Tellier),_oil_on_canvas,_100.3_x_73.6_cm,_Museum_of_Modern_Art_New_York..jpg", "http://www.arthistoryarchive.com/arthistory/cubism/images/PabloPicasso-Weeping-Woman-with-Handkerchief-1937.jpg", "https://s-media-cache-ak0.pinimg.com/736x/5f/c9/4f/5fc94f54df98d50bfae9b1807f3c5272.jpg", "http://www.kunst.wuerth.com/media/pictures/kunst/kh/picasso/9222_res500v.jpg", "https://i1.wp.com/www.guggenheim.org/wp-content/uploads/1931/01/82.2947_ph_web.jpg?fit=1200%2C962&ssl=1", "http://historyofinformation.com/images/picasso_guernica.jpg", "http://www.pablopicasso.org/images/paintings/avignon.jpg", "http://www.pablopicasso.org/images/paintings/three-musicians.jpg", "http://www.pablopicasso.org/images/paintings/ma-jolie.jpg", "http://www.pablopicasso.org/images/paintings/blue-nude.jpg", "http://www.pablopicasso.org/images/paintings/boy-with-pipe.jpg", "http://www.pablopicasso.org/images/paintings/woman-with-a-flower.jpg"];

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
      image.setAttribute('src', picasso[i]);
      image.setAttribute('width', 600);
      image.setAttribute('height', 600);
      svg.appendChild(image);

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

      temp.style.transform = "translate(" + (obj.x + direction[0] * cfg.boxsize) + "px, " + (obj.y + direction[1] * cfg.boxsize) + "px)";

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