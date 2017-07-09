// import * as THREE from '../../../libs/three.js';

var camera, controls, scene, renderer;

const viewportWidth = window.innerWidth / 2;
const viewportHeight = window.innerHeight / 2;

// movement
var velocity = new THREE.Vector3();
var prevTime = performance.now();

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

init();
render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( scene.fog.color );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( viewportWidth, viewportHeight );
	var container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	camera = new THREE.PerspectiveCamera( 60, viewportWidth / viewportHeight, 1, 1000 );
	camera.position.z = 500;
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // remove when using animation loop
// enable animation loop when using damping or autorotation
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = false;

// create the ground plane
	var planeGeometry = new THREE.PlaneGeometry(180, 180);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// rotate and position the plane
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;

// add the plane to the scene
	scene.add(plane);
// create cube
	let cubeGeometry = new THREE.CubeGeometry(20,20,20,20,20,20);
	let cubeMaterial = new THREE.MeshLambertMaterial();
	let cubePlayer = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cubePlayer.position.x = 0;
	cubePlayer.position.y = 1;
	cubePlayer.position.z = 0;
	
	scene.add(cubePlayer);

// lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );
	var light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( -1, -1, -1 );
	scene.add( light );
	var light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );
//
	window.addEventListener( 'resize', onWindowResize, false );

// movement

	var onKeyDownz = function ( event ) {
		debugger;
		switch ( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = true;
				break;
			case 37: // left
			case 65: // a
				moveLeft = true; 
				break;
			case 40: // down
			case 83: // s
				moveBackward = true;
				break;
			case 39: // right
			case 68: // d
				moveRight = true;
				break;
			case 32: // space
				if ( canJump === true ) velocity.y += 350;
				canJump = false;
				break;
		}
	};

	var onKeyUpz = function ( event ) {
		switch( event.keyCode ) {
			case 38: // up
			case 87: // w
				moveForward = false;
				break;
			case 37: // left
			case 65: // a
				moveLeft = false;
				break;
			case 40: // down
			case 83: // s
				moveBackward = false;
				break;
			case 39: // right
			case 68: // d
				moveRight = false;
				break;
		}

	document.addEventListener( 'keydown', onKeyDownz, false );
	document.addEventListener( 'keyup', onKeyUpz, false );

}
}
function onWindowResize() {
	camera.aspect = (viewportWidth / viewportHeight);
	camera.updateProjectionMatrix();
	renderer.setSize((viewportWidth, viewportHeight));
}
function animate() {
	requestAnimationFrame( animate );
	controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

	// movement
	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	// var mass = 100.0;
	// velocity.x -= velocity.x * 10.0 * delta;
	// velocity.z -= velocity.z * 10.0 * delta;
	// velocity.y -= 9.8 * mass * delta;

	if ( moveForward ) console.log('forward : ' + velocity.z); velocity.z -= 400.0 * delta;
	if ( moveBackward ) velocity.z += 400.0 * delta;
	if ( moveLeft ) velocity.x -= 400.0 * delta;
	if ( moveRight ) velocity.x += 400.0 * delta;

	// controls.object.translateX( velocity.x * delta );
	// controls.object.translateY( velocity.y * delta );
	// controls.object.translateZ( velocity.z * delta );
	
	render();

	prevTime = time;
}
function render() {
	renderer.render( scene, camera );
}