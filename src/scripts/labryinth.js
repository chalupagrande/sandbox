//Global Vars
const xmlns = 'http://www.w3.org/2000/svg';
var svg = document.querySelector('svg')
var data = {}

var mazes = [
  // MAZE 1
      {
        rings:  [
                  [42], //inner most = 1
                  [2], //2
                  [43.5,93.3], //3
                  [0.5,76], //4
                  [33.5,45,55,90], //5
                  [71.7], //6
                  [62,88], //7
                  [22.5,35,72.5], //8
                  [0.45,25.4,38,60.3,75.4,87.9], //9
                  [98] //10
                ],
                //lines             CENTER
        lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                  [1,0,0,1,0,1,1,1,1,0,0,0,0,1,0,1,0,0,0,1], //vertical
                  [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0], //horizontal
                  [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //1:30 - 7:30
                  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0], //10:30 - 4:30
                ]
      },
  // MAZE 2
      {
        rings:  [
                  [42], //inner most = 1
                  [1.6], //2
                  [43.5], //3
                  [0.5,45,95.1], //4
                  [33.5,45,88.3], //5
                  [71.7], //6
                  [62,88], //7
                  [22.5,35,72.5], //8
                  [25.4,38,75.4,97.8], //9
                  [50.4] //10
                ],
                //lines             CENTER
        lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                  [0,1,0,1,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1], //vertical
                  [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0], //horizontal
                  [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0], //1:30 - 7:30
                  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,0], //10:30 - 4:30
                ]
      },
  // MAZE 3
      {
        rings:  [
                  [42], //inner most = 1
                  [1.6], //2
                  [51.2], //3
                  [0.5,95.1], //4
                  [0.8], //5
                  [71.7], //6
                  [22.2], //7
                  [25.5,], //8
                  [22.8,47.8,72.8,97.8], //9
                  [0.4] //10  OUTER MOST
                ],
                //lines             CENTER
        lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                  [1,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0], //vertical
                  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //horizontal
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1:30 - 7:30
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //10:30 - 4:30
                ]
      },
]

//settings
const numRings = 10
const hedgeWidth = 10

setup(numRings, hedgeWidth)

//draw the rings
function drawRings(num, width){
  for(var i = 0; i < num; i++){
    var ring = document.createElementNS(xmlns,'circle')
    ring.setAttribute('cx','50%')
    ring.setAttribute('cy','50%')
    ring.setAttribute('r', (i+1)*width*2)
    ring.setAttribute('stroke-width',width)
    ring.setAttribute('class','ring-'+i)
    svg.append(ring)
  }
}

//set up ring data
function getSizes(){
  let circles = document.querySelectorAll('circle')
  circles = Array.prototype.slice.call(circles)

  //find the rings of the maze
  circles.forEach(function(el,i){
    var r = parseInt(el.getAttribute('r'))
    var circ = Math.PI*r*2
    data.rings.push({
      r: r,
      index: i,
      circ: circ,
      el: el,
      dashArray: []
    })
    if(i == circles.length-1){
      data.radius = r
    }
  })

  //find the center of the maze
  var x = svg.getBoundingClientRect().width / 2
  var y = svg.getBoundingClientRect().height / 2
  data.center = [x,y]
}

function drawLines(num = 2, width, dashArrays=[]){
  if(!num || num == 0) return
  if(num >= 1){
    var vertical = document.createElementNS(xmlns, 'line')
    vertical.setAttribute('x1', '50%')
    vertical.setAttribute('y1', data.center[1] - data.radius)
    vertical.setAttribute('x2', '50%')
    vertical.setAttribute('y2', data.center[1] + data.radius)
    vertical.setAttribute('stroke-width', width)
    svg.appendChild(vertical)
    data.lines.push(vertical)
  }
  if(num >= 2){
    var horizontal = document.createElementNS(xmlns, 'line')
    horizontal.setAttribute('y1', '50%')
    horizontal.setAttribute('x1', data.center[0] - data.radius)
    horizontal.setAttribute('y2', '50%')
    horizontal.setAttribute('x2', data.center[0] + data.radius)
    horizontal.setAttribute('stroke-width', width)
    svg.appendChild(horizontal)
    data.lines.push(horizontal)
  }
  if(num >= 3){
    var dia = document.createElementNS(xmlns, 'line')
    var run = findDiagonals(data.radius)
    dia.setAttribute('y1', data.center[1]-run)
    dia.setAttribute('x1', data.center[0]+run)
    dia.setAttribute('y2', data.center[1]+run)
    dia.setAttribute('x2', data.center[0]-run)
    dia.setAttribute('stroke-width', width)
    svg.appendChild(dia)
    data.lines.push(dia)
  }
  if(num >= 4){
    var dia = document.createElementNS(xmlns, 'line')
    var run = findDiagonals(data.radius)
    dia.setAttribute('y1', data.center[1]-run)
    dia.setAttribute('x1', data.center[0]-run)
    dia.setAttribute('y2', data.center[1]+run)
    dia.setAttribute('x2', data.center[0]+run)
    dia.setAttribute('stroke-width', width)
    svg.appendChild(dia)
    data.lines.push(dia)
  }
}

//where gapSize is the size of the gap in pixels
//percentages must be order from lowest to highest
function drawCircleGaps(circleIndex, percentages = [], gapSize = 10){
  var d =  data.rings[circleIndex]
  var ring = d.el
  var circ = d.circ
  var total = 0
  var remainder = circ
  for(var i = 0; i < percentages.length; i++){
    var distance = (percentages[i]*circ)/100
    var distancePlusGap = distance + gapSize
    d.dashArray.push(distance - total)
    d.dashArray.push(gapSize)
    total = distancePlusGap
    remainder = circ - total
    if(i == percentages.length - 1){
      d.dashArray.push(remainder)
    }
  }
  console.log(d.dashArray)
  ring.setAttribute('stroke-dasharray', d.dashArray.join(' '))
}

//where blocks is an array of truthy values determining
//whether or not it blocks the ring from the start of the line to the end.
function drawLineGaps(lineIndex, blocks=[], gapSize = 10){
  var line = data.lines[lineIndex]
  var result = []
  var seq = 1, last;
  for(var i = 0; i < blocks.length; i++){
    last = blocks[i]
    if(i == blocks.length -1 || blocks[i] != blocks[i+1]){
      result.push((last||-1)*seq*gapSize)
      seq = 1
    } else {
      seq += 1
    }
  }
  if(result[0] < 0) result = [0].concat(result)
  var dashArray = result.map(el => Math.abs(el)).join(' ')
  console.log(dashArray)
  line.setAttribute('stroke-dasharray', dashArray)
}

//where maze is an array of arrays with % values of where the gaps should start
//ie [[10,50,75],[25, 55, 90]] in order of inner to outer
function makeLabyrinth(maze){
  let circleGaps = maze.rings
  let lineGaps = maze.lines
  for(var i = 0; i < circleGaps.length; i++){
    drawCircleGaps(i, circleGaps[i], hedgeWidth*2)
  }
  for(var j = 0; j < lineGaps.length; j++){
    drawLineGaps(j,lineGaps[j], hedgeWidth*2)
  }
}

function setup(numRings, ringWidth){
  //reset
  document.querySelector('svg').remove()
  svg = document.createElementNS(xmlns,'svg')
  document.body.appendChild(svg)
  data = {
    rings: [],
    lines: [],
    center:[],
    radius: 0,
  };
  //redraw
  drawRings(numRings, ringWidth)
  getSizes()
  drawLines(4, ringWidth)
  makeLabyrinth(mazes[0])
  MorphSVGPlugin.convertToPath('circle')
}



/*
  HELPERS
*/
window.addEventListener('resize', debounce(setup.bind(null, numRings, hedgeWidth), 500))
function debounce(fn, delay){
  let id;
  return function(){
    clearTimeout(id)
    id = setTimeout(fn, delay)
  }
}
function toRadians(deg){
  return Math.PI*deg / 180
}
function findDiagonals(r){
  var run = Math.cos(toRadians(45))*r
  return run
}