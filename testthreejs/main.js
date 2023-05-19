import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00} );


const loader = new THREE.TextureLoader();
const cubeMaterials = [
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: false, side: THREE.DoubleSide }), //right side
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: false, side: THREE.DoubleSide }), //left side
    new THREE.MeshPhongMaterial({ map: loader.load('images/grass.png'), transparent: false, side: THREE.DoubleSide }), //top side
    new THREE.MeshPhongMaterial({ map: loader.load('images/full.png'), transparent: false, side: THREE.DoubleSide }), //bottom side
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: false, side: THREE.DoubleSide }), //front side
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: false, side: THREE.DoubleSide }), //back side
];




const cube = new THREE.Mesh( geometry, cubeMaterials );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
const light = new THREE.AmbientLight( 0xcccccc ); // soft white light
scene.add( light );
scene.add( directionalLight );
scene.add( cube );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
camera.position.z = 2;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.001;
	cube.rotation.y += 0.002;
	renderer.render( scene, camera );
}

animate();

var cameraDirection = new THREE.Vector3();
document.addEventListener('keydown', function(event) {
    camera.getWorldDirection(cameraDirection);
    if(event.keyCode == 87) {
        console.log('W was pressed');
	camera.position.x += Math.sin(cameraDirection.x);
	camera.position.z += Math.cos(cameraDirection.x);
    }
    else if(event.keyCode == 65) {
        console.log('A was pressed');
	
	camera.position.x += Math.cos(cameraDirection.x);
	camera.position.z -= Math.sin(cameraDirection.x);
    }
    else if(event.keyCode == 83) {
        console.log('S was pressed');
	camera.position.x -= Math.sin(cameraDirection.x);
	camera.position.z -= Math.cos(cameraDirection.x);
    }
    else if(event.keyCode == 68) {
        console.log('D was pressed');
	    
	camera.position.x -= Math.cos(cameraDirection.x);
	camera.position.z += Math.sin(cameraDirection.x);
    }
    else if(event.keyCode == 38) {
        camera.rotation.y += 5
    }
    else if(event.keyCode == 40) {
        camera.rotation.y -= 5
    }
    else if(event.keyCode == 39) {
        camera.rotation.x += 5
    }
    else if(event.keyCode == 37) {
        camera.rotation.x -= 5
    }
});

