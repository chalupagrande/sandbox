//Global Vars
const xmlns = 'http://www.w3.org/2000/svg';
var svg = document.querySelector('svg')
const hedgeWidth = 10;
var data = {
  rings: []
}
const mazes = [
  {
    rings: [
    [
      0,
      42,
      57.92,
      100
    ],
    [
      0,
      1.6,
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
    lines: [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
             [1,0,0,1,0,1,1,1,1,0,0,0,0,1,0,1,0,0,0,1], //vertical
             [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0], //horizontal
             [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //1:30 - 7:30
             [1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0], //10:30 - 4:30
           ],
  },
  {
    rings: [
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
    lines: [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
             [0,1,0,1,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1], //vertical
             [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0], //horizontal
             [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0], //1:30 - 7:30
             [1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,0], //10:30 - 4:30
           ],
  },
  {
    rings: [
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
  ],
    lines: [//1,2,3,4,5,6,7,8,9,-,-,9,8,7,6,5,4,3,2,1
             [1,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0], //vertical
             [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1], //horizontal
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1:30 - 7:30
             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //10:30 - 4:30
           ]
  }
]
setup()

/*
  DRAW RINGS
~~~~~~~~~~~~~~~~~~~~ */
function setup(){
  //reset
  document.querySelector('svg').remove()
  svg = document.createElementNS(xmlns,'svg')
  document.body.appendChild(svg)
  drawRings(findNumRings())
  getSizes()
  setPositions()
  rings()
}

function setPositions(){
  //rings
  var numRingsInIndexArray = findNumRings()
  var k = 0
  for(var i = 0; i < data.rings.length; i++){
    var el = data.rings[i]
    var ringIndex = el.index
    var numRingsInIndex = numRingsInIndexArray[ringIndex]
    for(var j = 0; j < mazes.length; j++){
      var ringPercents = mazes[j].rings[ringIndex]
      el.positions.push(
        [
          ringPercents[k*2] || '0%',
          ringPercents[k*2+1] || '0%'
        ])
    }
    k == numRingsInIndex-1 ? k = 0: k+=1;
  }
  console.log(data)
}
function drawRings(numRingsArray){
  for(var i = 0; i < numRingsArray.length; i++){
     for(var j = 0; j < numRingsArray[i]; j++){
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
function findNumRings(){
  let numRings = mazes[0].rings.length
  let numMazes = mazes.length
  let result = []
  let max = 0
  for(var i = 0; i < numRings; i++){
    for(var j = 0; j < numMazes; j++){
      max = Math.max(mazes[j].rings[i].length, max)
    }
    result.push(max)
    max = 0
  }
  result = result.map((e)=>{
    return e/2
  })
  return result
}
function getSizes(){
  let circles = document.querySelectorAll('circle')
  circles = Array.prototype.slice.call(circles)

  //find the rings of the maze
  circles.forEach(function(el,i){
    var r = parseInt(el.getAttribute('r'))
    var ringNum = parseInt(el.getAttribute('class').slice(-1))
    var circ = Math.PI*r*2
    data.rings.push({
      r: r,
      index: ringNum,
      circ: circ,
      el: MorphSVGPlugin.convertToPath(el),
      positions: []
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

/*
  HELPERS
*/
window.addEventListener('resize', debounce(setup, 500))
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
/*~~~~~~~~~~~~~~~
    ANIMATIONS
~~~~~~~~~~~~~~~~~ */



function rings(){
  var result = []
  for(var animationIndex = 0; animationIndex < mazes.length; animationIndex++){
    var timeline = new TimelineLite({
      delay: 1,
    })
    timeline.addLabel(`step-${animationIndex}`)
    for(var i = 0; i < data.rings.length; i++){
      var el = data.rings[i]
      timeline.to(el.el, animationTime, {
        drawSVG: `${el.positions[animationIndex][0]}% ${el.positions[animationIndex][1]}%`
      }, `step-${animationIndex}+=2`)
    }
    master.add(timeline)
  }
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
