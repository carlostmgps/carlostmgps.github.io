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
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: true, side: THREE.DoubleSide }), //right side
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: true, side: THREE.DoubleSide }), //left side
    new THREE.MeshPhongMaterial({ map: loader.load('images/grass.png'), transparent: true, side: THREE.DoubleSide }), //top side
    new THREE.MeshPhongMaterial({ map: loader.load('images/full.png'), transparent: true, side: THREE.DoubleSide }), //bottom side
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: true, side: THREE.DoubleSide }), //front side
    new THREE.MeshPhongMaterial({ map: loader.load('images/side.png'), transparent: true, side: THREE.DoubleSide }), //back side
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
camera.position.z = 50;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
