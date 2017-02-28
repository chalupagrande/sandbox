let xmlns = 'http://www.w3.org/2000/svg'
var cfg = {
  boxsize: 50,
  h: 300,
  w: 300,
  delay: 300, // 0.3 second -- corresponds to css transition
}

let picasso = [
  "https://upload.wikimedia.org/wikipedia/en/8/8d/Pablo_Picasso,_1905,_Au_Lapin_Agile_(At_the_Lapin_Agile),_oil_on_canvas,_99.1_x_100.3_cm,_Metropolitan_Museum_of_Art.jpg",
  "https://www.vanartgallery.bc.ca/the_exhibitions/images/picasso.jpg",
  "https://uploads2.wikiart.org/images/pablo-picasso/self-portrait-1907.jpg",
  "https://upload.wikimedia.org/wikipedia/en/1/1c/Pablo_Picasso,_1910,_Girl_with_a_Mandolin_(Fanny_Tellier),_oil_on_canvas,_100.3_x_73.6_cm,_Museum_of_Modern_Art_New_York..jpg",
  "http://www.arthistoryarchive.com/arthistory/cubism/images/PabloPicasso-Weeping-Woman-with-Handkerchief-1937.jpg",
  "https://s-media-cache-ak0.pinimg.com/736x/5f/c9/4f/5fc94f54df98d50bfae9b1807f3c5272.jpg",
  "http://www.kunst.wuerth.com/media/pictures/kunst/kh/picasso/9222_res500v.jpg",
  "https://i1.wp.com/www.guggenheim.org/wp-content/uploads/1931/01/82.2947_ph_web.jpg?fit=1200%2C962&ssl=1",
  "http://historyofinformation.com/images/picasso_guernica.jpg",
  "http://www.pablopicasso.org/images/paintings/avignon.jpg",
  "http://www.pablopicasso.org/images/paintings/three-musicians.jpg",
  "http://www.pablopicasso.org/images/paintings/ma-jolie.jpg",
  "http://www.pablopicasso.org/images/paintings/blue-nude.jpg",
  "http://www.pablopicasso.org/images/paintings/boy-with-pipe.jpg",
  "http://www.pablopicasso.org/images/paintings/woman-with-a-flower.jpg"
]

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

      let defs = document.querySelector('defs')
      let mask = document.createElementNS(xmlns, 'mask')
          mask.setAttribute('id', `mask-${x}-${y}`)
          defs.appendChild(mask)
      let rect = document.createElementNS(xmlns, 'rect')
          rect.setAttribute('width', cfg.boxsize)
          rect.setAttribute('height', cfg.boxsize)
          rect.setAttribute('x', x * cfg.boxsize)
          rect.setAttribute('y', y * cfg.boxsize)
          rect.style.fill = `white`

          mask.appendChild(rect)
      let image = document.createElementNS(xmlns, 'image')
          image.setAttribute('src', picasso[i])
          image.setAttribute('width', 600)
          image.setAttribute('height', 600)
          svg.appendChild(image)


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

      temp.style.transform = `translate(${obj.x + direction[0] * cfg.boxsize}px, ${obj.y + direction[1] * cfg.boxsize}px)`

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


