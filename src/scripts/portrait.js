let xmlns = 'http://www.w3.org/2000/svg'
var cfg = {
  boxsize: 200,
  h: 1800,
  w: 1200,
  dx: 0,
  dy: 0,
  delay: 300, // 0.3 second -- corresponds to css transition
}

var matrix = []

setup()
animate(0,0)

function createMatrix() {
  let cellsX = cfg.w / cfg.boxsize,
      cellsY = cfg.h / cfg.boxsize;

  for(let x = 0; x < cellsX; x++){
    matrix.push([])
    for(let y = 0; y < cellsY; y++){
      matrix[x].push(1)
    }
  }
  return matrix
}

function findMoveableTilePosition(x,y){
  let pos = [];
  let a = [x, y-1],
      b = [x, y+1],
      c = [x+1, y],
      d = [x-1, y];

  if(!!get(...a)) pos.push([x, y-1]);
  if(!!get(...b)) pos.push([x, y+1]);
  if(!!get(...c)) pos.push([x+1, y]);
  if(!!get(...d)) pos.push([x-1, y]);
  return pos[Math.floor(Math.random() * pos.length)]

}

function isValid(x,y){
  return x != undefined && y != undefined && x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length
}
function get(x,y){
  if(!isValid(x,y)) return false
  return matrix[x][y]
}
function set(x,y, value){
  return matrix[x][y] = value
}

function findFreePosition(x,y){
  let pos = [];
  let a = [x, y-1],
      b = [x, y+1],
      c = [x+1, y],
      d = [x-1, y];

  if(isValid(...a) && !get(...a) ) pos.push(a);
  if(isValid(...b) && !get(...b) ) pos.push(b);
  if(isValid(...c) && !get(...c) ) pos.push(c);
  if(isValid(...d) && !get(...d) ) pos.push(d);
  return pos[Math.floor(Math.random() * pos.length)]

}

function setup(){
  let tiles = document.querySelector('g#tiles');
  // tiles.setAttribute('width', cfg.w)
  // tiles.setAttribute('height', cfg.h)
  tiles.setAttribute('transform',`translate(${cfg.dx} ${cfg.dy})`)
  tiles.setAttribute('mask','url(#all)')


  let cellsX = cfg.w / cfg.boxsize,
      cellsY = cfg.h / cfg.boxsize,
      numBlocks = cellsX * cellsY,
      colorStep = 255 / numBlocks,
      i = 0;

  for(let x = 0; x < cellsX; x++){
    matrix.push([])
    for(let y = 0; y < cellsY; y++){
      // colored squares
      let el = document.createElementNS(xmlns, 'rect')
          el.setAttribute('class', 'tile')
          el.setAttribute('width', cfg.boxsize)
          el.setAttribute('height', cfg.boxsize)
          el.setAttribute('x', x * cfg.boxsize)
          el.setAttribute('y', y * cfg.boxsize)
          el.style.fill = `hsla(${i * colorStep}, 100%, 50%, 1)`

      tiles.appendChild(el)
      matrix[x].push({
        el: el,
        x: 0,
        y: 0
      })
      i++
    }
  }
  return matrix
}

function findMovementDirection(curX, curY, emptyX, emptyY){
  let x,y;
  if(emptyX == curX) x = 0;
  else x = emptyX < curX ? -1 : 1;
  if(emptyY == curY) y = 0;
  else y = emptyY < curY ? -1 : 1;
  return [x,y]
}

function animate(startX, startY){

  //clear 1 square
  get(startX, startY).el.remove()
  set(startX, startY, 0)
  var x = startX, y = startY;

  let step = function(){
    setTimeout(()=>{
      //change the matrix
      let [ox,oy] = findMoveableTilePosition(x,y)
      let obj = get(ox,oy)
      let temp = obj.el
      set(ox,oy, 0)

      //animate
      let direction = findMovementDirection(ox,oy,x,y)
      let nx = obj.x + (cfg.boxsize * direction[0])
      let ny = obj.y + (cfg.boxsize * direction[1])

      // temp.style.transform = `translate(${obj.x + direction[0] * cfg.boxsize}px, ${obj.y + direction[1] * cfg.boxsize}px)`
      TweenMax.to(temp, cfg.delay / 1000, {
        x: obj.x + direction[0] * cfg.boxsize,
        y: obj.y + direction[1] * cfg.boxsize,
      })

      obj.x = nx
      obj.y = ny
      set(x,y, obj)
      x = ox
      y = oy

      requestAnimationFrame(step)
    }, cfg.delay)
  }
  step()
}


