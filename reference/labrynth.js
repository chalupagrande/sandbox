//Global Vars
const xmlns = 'http://www.w3.org/2000/svg';
var svg = document.querySelector('svg')
var data = {}

var mazes = [
  [
    [
      0,
      42,
      57.92,
      100
    ],
    [
      0,
      2,
      9.96,
      100
    ],
    [
      0,
      43.5,
      48.81,
      93.3,
      98.61,
      100
    ],
    [
      0,
      0.5,
      4.48,
      76,
      79.98,
      100
    ],
    [
      0,
      33.5,
      36.68,
      45,
      48.18,
      55,
      58.18,
      90,
      93.18,
      100
    ],
    [
      0,
      71.7,
      74.35,
      100
    ],
    [
      0,
      62,
      64.27,
      88,
      90.27,
      100
    ],
    [
      0,
      22.5,
      24.49,
      35,
      36.99,
      72.5,
      74.49,
      100
    ],
    [
      0,
      0.5,
      2.27,
      25.4,
      27.17,
      38,
      39.77,
      60.3,
      62.07,
      75.4,
      77.17,
      87.9,
      89.67,
      100
    ],
    [
      0,
      98,
      99.59,
      100
    ]
  ],
  [
    [
      0,
      42,
      57.92,
      100
    ],
    [
      0,
      1.6,
      9.56,
      100
    ],
    [
      0,
      43.5,
      48.81,
      100
    ],
    [
      0,
      0.5,
      4.48,
      45,
      48.98,
      95.1,
      99.08,
      100
    ],
    [
      0,
      33.5,
      36.68,
      45,
      48.18,
      88.3,
      91.48,
      100
    ],
    [
      0,
      71.7,
      74.35,
      100
    ],
    [
      0,
      62,
      64.27,
      88,
      90.27,
      100
    ],
    [
      0,
      22.5,
      24.49,
      35,
      36.99,
      72.5,
      74.49,
      100
    ],
    [
      0,
      25.4,
      27.17,
      38,
      39.77,
      75.4,
      77.17,
      97.8,
      99.57,
      100
    ],
    [
      0,
      50.4,
      51.99,
      100
    ]
  ],
  [
    [
      0,
      42,
      57.92,
      100
    ],
    [
      0,
      1.6,
      9.56,
      100
    ],
    [
      0,
      51.2,
      56.51,
      100
    ],
    [
      0,
      0.5,
      4.48,
      95.1,
      99.08,
      100
    ],
    [
      0,
      0.8,
      3.98,
      100
    ],
    [
      0,
      71.7,
      74.35,
      100
    ],
    [
      0,
      22.2,
      24.47,
      100
    ],
    [
      0,
      25.5,
      27.49,
      100
    ],
    [
      0,
      22.8,
      24.57,
      47.8,
      49.57,
      72.8,
      74.57,
      97.8,
      99.57,
      100
    ],
    [
      0,
      0.4,
      1.99,
      100
    ]
  ]
]

var numRingsConversion;
/*
  DRAW NEW RINGS
~~~~~~~~~~~~~~~~~~~~ */
function drawNewRings(){
  for(var i = 0; i < numRingsConversion.length; i++){
     for(var j = 0; j < numRingsConversion[i]; j++){
       var ring = document.createElementNS(xmlns,'circle')
       ring.setAttribute('cx','50%')
       ring.setAttribute('cy','50%')
       ring.setAttribute('r', (i+1)*hedgeWidth*2)
       ring.setAttribute('stroke-width',hedgeWidth)
       ring.setAttribute('class','ring-'+i)
       svg.append(ring)
     }
  }
}

// function drawNewRingGaps(maze){
//   var rings = maze.length
//   for(var i = 0; i < rings; i++){
//     var rs = document.querySelectorAll(`.ring-${i}`)
//     rs = Array.prototype.slice.call(rs)
//     for(var j = 0; j < rs.length; j++){

//     }
//   }
// }

/*
  CONVERSION
~~~~~~~~~~~~~~~~~~~*/

function findPercentages(maze, ringIndex, gapSize = 20){
  var circ = data.rings[ringIndex].circ
  var result = [0]
  for(var i = 0; i < maze.rings[ringIndex].length; i++){
    var percent = maze.rings[ringIndex][i]
    result.push(percent)
    result.push(((percent/100*circ + gapSize)/circ *100))
  }
  result.push(100)
  return result
}

function newRings(mazeNum){
  var mazePercents = []
  for(var i = 0; i < mazes[mazeNum].rings.length; i++){
    mazePercents.push(findPercentages(mazes[mazeNum],i))
  }
  return mazePercents
}

function findNewMazePercents(){
  var percents = []
  for(var i = 0; i < mazes.length; i++){
    percents.push(newRings(i))
  }
  return percents
}

function findNumRings(){
  let numRings = mazes[0].length
  let numMazes = mazes.length
  let result = []
  let max = 0
  for(var i = 0; i < numRings; i++){
    for(var j = 0; j < numMazes; j++){
      max = Math.max(mazes[j][i].length, max)
    }
    result.push(max)
    max = 0
  }
  result = result.map((e)=>{
    return e/2
  })
  return result
}

function roundValues(){
  return mazes.map((maze)=>{
    return maze.map((ring)=>{
      return ring.map((percent)=>{
        return Math.round(percent * 100) / 100
      })
    })
  })
}

/*~~~~~~~~~~~~~~~~~~~~
  OLD CODE
~~~~~~~~~~~~~~~~~~~~~~*/
//settings
const numRings = 10
const hedgeWidth = 10

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

    //setup new
    numRingsConversion = findNumRings()
    drawNewRings()

  getSizes()
  drawLines(4, ringWidth)
  drawNewRingGaps(mazes[0]);
  // makeLabyrinth(mazes[0])
  MorphSVGPlugin.convertToPath('circle')
  // console.log(findNewMazePercents(0))
}
setup(numRings, hedgeWidth)

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

/*
  ANIMATIONS
*/

var master = new TimelineMax()
function circleRun(){
  let tl = new TimelineMax()
  tl.add('start')
  tl.staggerFromTo('path', 1, {
    rotation: -90,
    drawSVG: '0 87.9%',
    transformOrigin: '50%, 50%',
  },{
    drawSVG: '100%, 100%',
    // rotation: 270,
    repeat: -1,
    ease: 'ease',
    yoyo: true,
  }, 0.1, 'start')
  return tl
}
function lineRun(){
  let tl2 = new TimelineMax()
  tl2.add('start')
  tl2.staggerFromTo('line', 10, {
    rotation: 0,
    transformOrigin: '50% 50%'
  },{
    rotation: 360,
    ease: 'ease',
    yoyo: true,
  }, 0.1, 'start')
  return tl2
}



// //NOTE: lineRun will never play because circleRun is on infinite loop
// master.add(circleRun())
// master.add(lineRun())
