var polys = document.querySelectorAll('polygon,polyline');
[].forEach.call(polys,convertPolyToPath);

let master = new TimelineMax({
  overwrite: true,
})


let paths = [... document.querySelectorAll('path')]
let easeFunc = BezierEasing(0,1,0.2,1)


paths.forEach((el,i)=>{
  // el.addEventListener('mouseenter', (event)=>{
  //   event.target.style.fillOpacity = 0
  // })
  // el.addEventListener('mouseleave', (event)=>{
  //   event.target.style.fillOpacity = 1
  // })

  master.add(TweenMax.fromTo(el, 1 - easeFunc(i / paths.length), {
    drawSVG: '0%',
    'stroke': 'black',
    'stroke-width': 1,
    'stroke-width': 1,
    'stroke-opacity': 1,
  }, {
    drawSVG: '100%',
    'stroke': 'black',
    'stroke-width': 1,
    'stroke-width': 1,
    'stroke-opacity': 1,
  }))
   master.add(TweenMax.fromTo(el, 1 - easeFunc(i / paths.length), {
    'fill-opacity': 0,
    'stroke-opacity': 1,
  }, {
    drawSVG: '100%',
    'stroke-opacity': 0,
    'fill-opacity': 1
  }))
})




/* Helpers
~~~~~~~~~~~~~~~~ */

// regular cosine easing
function getEaseTimings(initial, steps, easeType){
  let interval = Math.PI/ steps,
      result = [];

  for(var i = 0; i < steps; i++){
    let m = Math.abs(Math.cos(interval * i))
    result.push(m * initial)
  }
  return result
}

function convertPolyToPath(poly){
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS,'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var x0=points.shift(), y0=points.shift();
  var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
  if (poly.tagName=='polygon') pathdata+='z';
  path.setAttribute('d',pathdata);
  path.setAttribute('fill', poly.getAttribute('style').split(': ')[1])
  poly.parentNode.replaceChild(path,poly);
}


