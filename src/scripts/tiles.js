let xmlns = 'http://www.w3.org/2000/svg'
var cfg = {
  boxsize: 50,
  h: 600,
  w: 600,
  speed: 0.2
}

var matrix = []



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

//where startX & startY are an empty space that can be moved to
function start(startX, startY, cycles){
  set(startX,startY, 0)
  let x = startX, y = startY, i = 0;

  for(i;i < cycles;i++ ){
    let [nx,ny] = findMoveableTilePosition(x,y)
    set(nx,ny,0)
    set(x,y,i+1)

    x = nx
    y = ny
  }
}

function setup(){
  let svg = document.querySelector('svg');
  svg.setAttribute('width', cfg.w)
  svg.setAttribute('height', cfg.h)

  let cellsX = cfg.w / cfg.boxsize,
      cellsY = cfg.h / cfg.boxsize,
      numBlocks = cellsX * cellsY,
      colorStep = 255 / numBlocks,
      i = 0;

  for(let x = 0; x < cellsX; x++){
    matrix.push([])
    for(let y = 0; y < cellsY; y++){

      let el = document.createElementNS(xmlns, 'rect')
          el.setAttribute('width', cfg.boxsize)
          el.setAttribute('height', cfg.boxsize)
          el.setAttribute('x', x*cfg.boxsize)
          el.setAttribute('y', y*cfg.boxsize)
          el.style.fill = `hsla(${i * colorStep}, 100%, 50%, 1)`

      svg.appendChild(el)

      matrix[x].push(el)
      i++
    }
  }
  return matrix
}

setup()
animate(new TimelineLite(),6,6,10000)

function findMovementDirection(curX, curY, emptyX, emptyY){
  let x,y;
  if(emptyX == curX) x = 0;
  else x = emptyX < curX ? -1 : 1;
  if(emptyY == curY) y = 0;
  else y = emptyY < curY ? -1 : 1;
  return [x,y]
}

function animate(timeline, startX, startY, cycles){
  //clear 1 square
  get(startX, startY).remove()
  set(startX,startY, 0)
  let x = startX, y = startY;
  for(let i = 0;i < cycles;i++ ){
    // debugger;
    //change the matrix
    let [ox,oy] = findMoveableTilePosition(x,y)
    let temp = get(ox,oy)
    set(ox,oy, 0)
    set(x,y, temp)

    //animate
    let direction = findMovementDirection(ox,oy,x,y)
    let tl = new TimelineLite()
    timeline.add(tl.to(temp, cfg.speed, {
        x: `+= ${cfg.boxsize * direction[0]}`,
        y: `+= ${cfg.boxsize * direction[1]}`,
        ease: 'ease'
    }))
    x = ox
    y = oy
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