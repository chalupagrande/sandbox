
var group;
var container, controls, stats;
var particlesData = [];
var camera, scene, renderer;
var positions, colors;
var particles;
var pointCloud;
var particlePositions;
var light, camera;
//
var dode;
var skull, skullCloud, skullPositions;
var spherePoints;
var sParticles;
var sParticleData = [];
var sParticlePositions;
var sPointCloud;
var spMaterial;
//
var linesMesh;
var maxParticleCount = 1000;
var particleCount = 500;
var r = 800;
var rHalf = r / 2;
var effectController = {
  showDots: true,
  showLines: true,
  minDistance: 130,
  limitConnections: false,
  maxConnections: 10,
  particleCount: 500
};
init();

function initGUI() {
  var gui = new dat.GUI();
  gui.add( effectController, "showDots" ).onChange( function( value ) { pointCloud.visible = value; } );
  gui.add( effectController, "showLines" ).onChange( function( value ) { linesMesh.visible = value; } );
  gui.add( effectController, "minDistance", 10, 300 );
  gui.add( effectController, "limitConnections" );
  gui.add( effectController, "maxConnections", 0, 30, 1 );
  gui.add( effectController, "particleCount", 0, maxParticleCount, 1 ).onChange( function( value ) {
    particleCount = parseInt( value );
    particles.setDrawRange( 0, particleCount );
  });
}
function init() {
  // initGUI();
  container = document.getElementById( 'wrapper' );
  //
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
  camera.position.z = 400;
  controls = new THREE.OrbitControls( camera, container );
  scene = new THREE.Scene();
  group = new THREE.Group();
  scene.add( group );
  var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ) );
  helper.material.color.setHex( 0x080808 );
  helper.material.blending = THREE.AdditiveBlending;
  helper.material.transparent = true;
  group.add( helper );
  //
}
function drawPoints(){
  /*~~~~~~~~~~
    sphere!!!
  ~~~~~~~~~~~~~~*/

   var dodeGeoemetry = new THREE.SphereBufferGeometry( 30, 15, 15 );
   var dodeMaterial = new THREE.MeshLambertMaterial({ color: 0xFF5500})
   dode = new THREE.Mesh(dodeGeoemetry, dodeMaterial)
   light = new THREE.SpotLight( 0xffffff ); // soft white light
   light.position.z = 400
   light.position.y = 400
   light.position.x = 600
   group.add(light)
   // group.add(dode)

  /*~~~~~~~~~~
    / sphere!!!
  ~~~~~~~~~~~~~~*/

  spherePoints = dode.geometry.attributes.position.array.length/3
  var segments = maxParticleCount * maxParticleCount;
  positions = new Float32Array( segments * 3  + spherePoints*3 );
  colors = new Float32Array( segments * 3 + spherePoints*3);
  var pMaterial = new THREE.PointsMaterial( {
    color: 0xFFFFFF,
    size: 3,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
  } );
  particles = new THREE.BufferGeometry();
  particlePositions = new Float32Array( maxParticleCount * 3 + spherePoints*3);
  var i = 0
  for (i; i < particleCount; i++ ) {
    var x = Math.random() * r - r / 2;
    var y = Math.random() * r - r / 2;
    var z = Math.random() * r - r / 2;
    particlePositions[ i * 3     ] = x;
    particlePositions[ i * 3 + 1 ] = y;
    particlePositions[ i * 3 + 2 ] = z;
    // add it to the geometry
    particlesData.push( {
      velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  -1 + Math.random() * 2 ),
      numConnections: 0
    } );
  }



  /*~~~~~~~~~~
    adding stationary particles
  ~~~~~~~~~~~~~~*/

  var array = dode.geometry.attributes.position.array
  for(var j = 0; j < spherePoints; j++){
    var x = array[j]
    var y = array[j+1]
    var z = array[j+2]
    particlePositions[(i+j) * 3    ] = x
    particlePositions[(i+j) * 3 + 1] = y
    particlePositions[(i+j) * 3 + 2] = z
    particlesData.push({
      velocity: new THREE.Vector3(0,0,0),
      numConnections: 0
    })
  }

  particles.setDrawRange( 0, particleCount + spherePoints);
  particles.addAttribute( 'position', new THREE.BufferAttribute(particlePositions, 3 ).setDynamic( true ) );

  pointCloud = new THREE.Points( particles, pMaterial );
  group.add( pointCloud );

  /*~~~~~~~~~~
    / adding stationary particles
  ~~~~~~~~~~~~~~*/


  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
  geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setDynamic( true ) );
  geometry.computeBoundingSphere();
  geometry.setDrawRange( 0, 0 );
  var material = new THREE.LineBasicMaterial( {
    vertexColors: THREE.VertexColors,
    blending: THREE.AdditiveBlending,
    transparent: true
  } );
  linesMesh = new THREE.LineSegments( geometry, material );
  group.add( linesMesh );
  //
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  container.appendChild( renderer.domElement );
  //
  // stats = new Stats();
  // container.appendChild( stats.dom );
  window.addEventListener( 'resize', onWindowResize, false );

  // LETS GO!
  animate()
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
  var vertexpos = 0;
  var colorpos = 0;
  var numConnected = 0;
  for ( var i = 0; i < particleCount+spherePoints; i++ )
    particlesData[ i ].numConnections = 0;
  for ( var i = 0; i < particleCount+spherePoints; i++ ) {
    // get the particle
    var particleData = particlesData[i];
    particlePositions[ i * 3     ] += particleData.velocity.x;
    particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
    particlePositions[ i * 3 + 2 ] += particleData.velocity.z;
    if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
      particleData.velocity.y = -particleData.velocity.y;
    if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
      particleData.velocity.x = -particleData.velocity.x;
    if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
      particleData.velocity.z = -particleData.velocity.z;
    if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
      continue;
    // Check collision
    for ( var j = i + 1; j < particleCount+spherePoints; j++ ) {
      var particleDataB = particlesData[ j ];
      if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
        continue;
      var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
      var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
      var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
      var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
      if ( dist < effectController.minDistance ) {
        particleData.numConnections++;
        particleDataB.numConnections++;
        var alpha = 1.0 - dist / effectController.minDistance;
        positions[ vertexpos++ ] = particlePositions[ i * 3     ];
        positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
        positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];
        positions[ vertexpos++ ] = particlePositions[ j * 3     ];
        positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
        positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];
        colors[ colorpos++ ] = alpha;
        colors[ colorpos++ ] = alpha;
        colors[ colorpos++ ] = alpha;
        colors[ colorpos++ ] = alpha;
        colors[ colorpos++ ] = alpha;
        colors[ colorpos++ ] = alpha;
        numConnected++;
      }
    }
  }
  linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
  linesMesh.geometry.attributes.position.needsUpdate = true;
  linesMesh.geometry.attributes.color.needsUpdate = true;
  pointCloud.geometry.attributes.position.needsUpdate = true;
  requestAnimationFrame( animate );
  // stats.update();
  render();
}
function render() {
  var time = Date.now() * 0.001;
  // group.rotation.z = time * 0.2;
  renderer.render( scene, camera );
}


var loader = new THREE.STLLoader();
loader.load( '../resources/Skull.stl', function ( geometry ) {
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 200, wireframe: true } );
  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 0, - 0.25, 0.6 );
  mesh.rotation.set( 0, - Math.PI / 2, 0 );
  mesh.scale.set( 0.5, 0.5, 0.5 );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  skull = mesh
  skull.rotation.x = -1.5
  skull.rotation.y = 0
  skull.position.y = -20
  skull.position.z = 15
  group.add( skull );

  drawPoints()
  document.querySelector('.loader').remove()
});


// function drawSkullPoints(){
//   skullPositions = skull.geometry.attributes.position.array
//   console.log(skullPositions)
//   var length = skullPositions.length/3
//   var skullGeometry = new THREE.BufferGeometry()
//   skullGeometry.setDrawRange(0, length)
//   skullGeometry.addAttribute('position', new THREE.BufferAttribute(skullPositions, 3).setDynamic(true))
//   skullCloud = new THREE.Points(skullGeometry, spMaterial)
//   skullCloud.rotation.z = 0
//   // group.add(skullCloud)
// }
