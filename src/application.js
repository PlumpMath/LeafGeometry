/* eslint-env browser */
import * as THREE from 'three';
import Gui from './gui.js';
import LeafGeometry from './leafGeometry.js';
import CollectionMaterials from './materials.js';
import {PointLights} from './pointLights.js';

const gui = new Gui();
const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.style.margin =0;
document.body.appendChild(renderer.domElement);
camera.position.z = 80;
this.controls = new OrbitControls(camera, renderer.domElement);


//scene
const materials = new CollectionMaterials;
const material = materials["phong"];
var object;
var group = new THREE.Group();
var lights = PointLights();
lights.map((light)=>{
    scene.add(light);
});

//lights
let ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );
gui.addScene(scene, ambientLight, renderer);
gui.addMaterials(materials);

var axisHelper = new THREE.AxisHelper( 50 );
scene.add( axisHelper );

window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
});

function makeLeaf(material) {
    let geometry = new LeafGeometry(
        gui.params.length,
        gui.params.length_stem,
        gui.params.width_stem,
        gui.params.leaf_width,
        gui.params.leaf_up,
        gui.params.density,
        gui.params.curvature,
        gui.params.curvature_border,
        gui.params.leaf_inclination
    );


    object = new THREE.Mesh(geometry, materials[gui.params.material]);
    object.name = "leaf";
    scene.add(object);
}

function render(){
    makeLeaf(material);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    let selectedObject = scene.getObjectByName("leaf");
    scene.remove( selectedObject );
}

render();
