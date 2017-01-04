//Global Vars
const xmlns = 'http://www.w3.org/2000/svg';
var svg = document.querySelector('svg')
const master = new TimelineMax({
  repeat: -1
})
//copy
  var mazes = [
    // MAZE 1
        {
          rings:  [
                    [42], //inner most = 1
                    [1], //2
                    [43.5,93.5], //3
                    [0.5,76], //4
                    [33.5,45,55,88.3], //5
                    [71.7], //6
                    [62,88], //7
                    [22.5,35,72.5], //8
                    [0.45,25.4,38,60.3,75.4,87.9], //9
                    [98] //10
                  ],
                  //lines             CENTER
          lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                    [1,0,0,0,0,1,1,1,1,0,0,0,0,1,0,1,0,0,0,1], //vertical
                    [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0], //horizontal
                    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //1:30 - 7:30
                    [1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0], //10:30 - 4:30
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
                    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1], //horizontal
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1:30 - 7:30
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //10:30 - 4:30
                  ]
        },
    // MAZE 4
        {
          rings:  [
                    [5], //inner most = 1
                    [90], //2
                    [0.5,51.2], //3
                    [32.6], //4
                    [8.5,46,83.3], //5
                    [71.7,75.3], //6
                    [13,47], //7
                    [36.5,50.5, 75.5], //8
                    [22.8,25.3,60.3, 97.8], //9
                    [0.4] //10  OUTER MOST
                  ],
                  //lines             CENTER
          lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                    [1,0,0,0,0,0,1,1,1,0,0,0,0,1,0,1,0,1,1,0], //vertical
                    [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1], //horizontal
                    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //1:30 - 7:30
                    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0], //10:30 - 4:30
                  ]
        },
  ]
var mazesCoded = [
  // MAZE 1
      {
        rings:  [
                  ['4-c'], //inner most = 1
                  ['0-b'], //2
                  ['4-a','8-a'], //3
                  ['0-b','6-b'], //4
                  ['3-a','4-a','4-b','7-b'], //5
                  ['6-a'], //6
                  ['5-c','7-b'], //7
                  ['2-a','3-a','6-a'], //8
                  ['0-b','2-b','3-b','5-a','6-b','7-b'], //9
                  ['8-a'] //10
                ],
                //lines             CENTER
        lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                  [1,0,0,0,0,1,1,1,1,0,0,0,0,1,0,1,0,0,0,1], //vertical
                  [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0], //horizontal
                  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //1:30 - 7:30
                  [1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0], //10:30 - 4:30
                ]
      },
  // MAZE 2
      {
        rings:  [
                  ['0-b'], //inner most = 1
                  ['8-a'], //2
                  ['0-b','4-b'], //3
                  ['3-a'], //4
                  ['1-c','4-a','7-a'], //5
                  ['6-a','6-b'], //6
                  ['1-b','4-a'], //7
                  ['3-c','4-b', '6-b'], //8
                  ['2-a','2-b','5-a', '8-a'], //9
                  ['0-b'] //10  OUTER MOST
                ],
                //lines             CENTER
        lines:  [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
                  [1,0,0,0,0,0,1,1,1,0,0,0,0,1,0,1,0,1,1,0], //vertical
                  [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1], //horizontal
                  [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //1:30 - 7:30
                  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0], //10:30 - 4:30
                ]
      },
  // MAZE 3
      {
        rings:  [
                  ['4-c'], //inner most = 1
                  ['0-b'], //2
                  ['4-b'], //3
                  ['0-b','8-a'], //4
                  ['0-b'], //5
                  ['6-a'], //6
                  ['2-a'], //7
                  ['2-b',], //8
                  ['2-a','4-a','6-a','8-a'], //9
                  ['0-b'] //10  OUTER MOST
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
var currentMaze = mazes[2]

//NOTE: hedgeWidth and gapSize in PIXELS
var hedgeWidth = 10
var gapSize = 20

setup()

/*
  location: 1-a, 6-b etc...
    where: 12o'clock = 0 ... 6 o'clock = 4
    first side = a ... second side = b
*/

function findPercentFromPosition(location, radius){
  var perc1,perc2,
      circ = Math.PI*2*radius,
      gapPercent = gapSize*(100/circ);

  if(typeof location == 'string'){
    var position = location.split('-')[0]*(25/2)
    var side = location.split('-')[1]
    var margin = (hedgeWidth/2)*(100/circ)

    if(side == 'a'){
      perc1 = round(position - margin - gapPercent)
      perc2 = round(position - margin)
    } else if(side == 'b') {
      perc1 = round(position + margin)
      perc2 = round(position + margin + gapPercent)
    } else if(side =='c'){
      perc1 = round(position - gapPercent/2)
      perc2 = round(position + gapPercent/2)

    }
  } else {
    perc1 = round(location)
    perc2 = round(location + gapPercent)
  }
  return [perc1, perc2]
}

//for one maze
function convertCodeToPercent(maze){
  var rings = maze.rings
  var result = []
  for(var i = 0; i < rings.length; i++){
    var n = []
    var l = rings[i].length
    for(var j = 0; j < l; j++){
      if(j == 0) n.push(0)
      var position = rings[i][j]
      var percents = findPercentFromPosition(position, (i+1)*2*hedgeWidth)
      n.push(percents[0])
      n.push(percents[1])
      if(j == l-1) n.push(100)
    }
    result.push(n)
  }
  return result
}

// findNum functions return the number of rings needed to draw appropriate circles.
function findNumLines(mazes){
  var result = []
  for(var i = 0; i < 4; i++){
    var max = 0
    for(var j = 0; j < mazes.length; j++){
      max = Math.max(mazes[j].lines[i].reduce((a,b)=> a+b), max)
    }
    result.push(max)
  }
  return result
}

function findNumRings(percentages){
  var result = []
  for(var i = 0; i < percentages[0].length; i++){
    var max = 0;
    for(var j = 0; j < percentages.length; j++){
      max = Math.max(percentages[j][i].length, max)
    }
    result.push(max)
  }
  return result
}

//where toBlack is a boolean determining if it fills completely in between mazes.
function drawLabryinth(mazes, toBlack){
  var numMazes = mazes.length
  var result = {
    rings: null,
    lines: null
  }

  //rings
    var numRings = mazes[0].rings.length
    var percentRings = []
    mazes.forEach((maze,i)=>{
      percentRings.push(convertCodeToPercent(maze))
    })
    var numRingsArray = findNumRings(percentRings)
    var ringAnimationData = []
    for(var i = 0; i < numRings; i++){
      var totalSegments = numRingsArray[i]
      for(var j = 0; j < totalSegments/2; j++){

        var ring = document.createElementNS(xmlns, 'circle')
        ring.setAttribute('cx','50%')
        ring.setAttribute('cy','50%')
        ring.setAttribute('r', (i+1)*hedgeWidth*2)
        ring.setAttribute('stroke-width',hedgeWidth)
        ring.setAttribute('class','ring-'+i)
        svg.append(ring)
        var animationArray = []
        for(var k = 0; k < numMazes; k++){
          var perc1 = percentRings[k][i][j*2]
          var perc2 = percentRings[k][i][j*2+1]
          if(perc1 == undefined || perc2 == undefined){
            perc1 = 99.99
            perc2 = 100
          }
          animationArray.push(perc1, perc2)
        }

        ringAnimationData.push({
            el: ring,
            ringIndex: i,
            segmentIndex: j,
            totalSegments: totalSegments/2,
            position: animationArray
        })
      }
    }
    result.rings = ringAnimationData
  //lines
  return result
}
/*
  where ao is the an Animation Data Object returned by drawLabryinth
*/
function setupAnimations(mazes, ao){
  var animationTime = 0.5
  for(let animationIndex = 0; animationIndex < mazes.length; animationIndex++){
    var tl = new TimelineLite()
    tl.addLabel(`step-${animationIndex}`)
    for(let i = 0; i < ao.rings.length; i++){
      var ob = ao.rings[i]
      tl.to(ob.el, animationTime, {
        drawSVG: `${ob.position[animationIndex*2]}% ${ob.position[animationIndex*2+1]}%`,
      }, `step-${animationIndex}`)
      tl.to(ob.el, animationTime*3, {
        drawSVG: `0% 100%`,
      }, `step-${animationIndex} += 10`)
    }

    master.add(tl)
  }
}



/* ~~~~~~~~~~~~~~~~~~~~~~~
        HELPERS
~~~~~~~~~~~~~~~~~~~~~~~~~ */

  //setup
  var deb;
  function setup(){
    window.addEventListener('resize', debounce(drawMaze.bind(null, currentMaze), 500))
    setupSlider()
    deb = drawLabryinth(mazesCoded, false)
    console.log(deb)
    setupAnimations(mazesCoded, deb)
  }

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
  function round(num, digits = 2){
    var m = Math.pow(10, digits)
    return Math.round(num*m)/m
  }

  function setupSlider(){
    var input = document.querySelector('input[type=range]')
    input.addEventListener('input', function(){
      master.time((master.duration()/500)* this.value)
      master.pause()
    })
    var play = document.querySelector('.play')
    play.addEventListener('click', function(){
      master.play()
    })
  }
/* ~~~~~~~~~~~~~~~~~~~~~~~
    DRAW BASIC MAZE
~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// drawMaze(currentMaze)
function drawMaze(m){
  const numRings = 10
  const hedgeWidth = 10
  var data = {
    rings: [],
    lines: [],
    center:[],
    radius: 0,
  };

  //reset
  document.querySelector('svg').remove()
  svg = document.createElementNS(xmlns,'svg')
  document.body.appendChild(svg)

  //redraw
  drawRings(numRings, hedgeWidth)
  getSizes()
  drawLines(4, hedgeWidth)
  makeLabyrinth(m)


  /* ~~~~~~~~~~~~~~
      FUNCTIONS
  ~~~~~~~~~~~~~~~~~*/
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
    var d = data.rings[circleIndex]
    var circ = d.circ
    var ring = d.el
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
    // MorphSVGPlugin.convertToPath('circle')
  }
}

