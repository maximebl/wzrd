
var camera, controls, renderer;

let cubePlayer;
let cubeTest;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// movement
var velocity = new THREE.Vector3();
var prevTime = performance.now();

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
let scrollingUp = false;
let scrollingDown = false;


init();
render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('wheel', onMouseWheelScroll);

	window.scene = new THREE.Scene();
    window.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( window.scene.fog.color );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( viewportWidth, viewportHeight );
    var container = document.getElementById( 'viewport' );
    container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, viewportWidth / viewportHeight, 1, 1000 );
	camera.position.z = 500;
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener( 'change', render ); // remove when using animation loop

// create the ground plane
	var planeGeometry = new THREE.PlaneGeometry(180, 180);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;
	window.scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
	let cubeMaterial = new THREE.MeshLambertMaterial();
	cubePlayer = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubePlayer.add(camera);
    window.scene.add(cubePlayer);
    window.scene.add(camera);

    cubePlayer.name = "cubePlayer";


// lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	window.scene.add( light );
	var light1 = new THREE.DirectionalLight( 0x002288 );
	light1.position.set( -1, -1, -1 );
	window.scene.add( light1 );
	var light2 = new THREE.AmbientLight( 0x222222 );
	window.scene.add( light2 );

// movement
    initCameraPosition();

    function onKeyDown( event ) {
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

	function onKeyUp( event ) {
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
    }

    function onMouseWheelScroll(e) {

        if (e.deltaY > 0) {
            camera.translateZ(velocity.z * 10);
            scrollingDown = true;
        }
        else {
            camera.translateZ((velocity.z * 10) * -1);
            scrollingDown = true;
        }
    }
}

function onWindowResize() {
    camera.aspect = (viewportWidth / viewportHeight);
    camera.updateProjectionMatrix();
    renderer.setSize((viewportWidth, viewportHeight));
}

function animate() {
	requestAnimationFrame( animate );

	// movement
	var time = performance.now();

    velocity.x = 1.0;
    velocity.z = 1.0;

    if (moveRight) {
        cubePlayer.translateZ(1);
    }

    if (moveLeft) {
        cubePlayer.translateZ(-1);
    }

    if (moveForward) {
        cubePlayer.translateX(1);
    }

    if (moveBackward) {
        cubePlayer.translateX(-1);
    }

	render();

	prevTime = time;
}


function initCameraPosition() {
    camera.position.x = cubePlayer.position.x;
    camera.position.z = cubePlayer.position.z;
    camera.position.y = 60;
}

function render() {
	renderer.render( window.scene, camera );
}

module.hot.accept();