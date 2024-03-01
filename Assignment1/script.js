import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/*************
 ** SETUP **
**************/

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/*************
 ** SCENE **
**************/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(8, 3.5, 9)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*************
 ** MESHES **
**************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set (0, -2.5, 0) 
scene.add(caveFloor)

// OBJECTS
// coneSquare
const coneSquareGeometry = new THREE.ConeGeometry(2, 2, 4)
const coneSquareMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2F3E46')
})
var coneSquare = new THREE.Mesh(coneSquareGeometry, coneSquareMaterial)
coneSquare.position.set(5, 1.5, -2.5)
//cone.rotation.x = Math.PI * -1.9
coneSquare.castShadow = true
scene.add(coneSquare)

// coneCircle
const coneCircleGeometry = new THREE.ConeGeometry(2, 2, 30)
const coneCircleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2F3E46')
})
var coneCircle = new THREE.Mesh(coneCircleGeometry, coneCircleMaterial)
coneCircle.position.set(5, 1.5, 2.5)
//cone.rotation.x = Math.PI * -1.9
coneCircle.castShadow = true
scene.add(coneCircle)

/*************
 ** LIGHTS **
**************/

/*
Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('#76A398')
)
scene.add (ambientLight)
*/

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('#CAD2C5'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set (10, 2, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
scene.add(directionalLight)

// Directional Light Helper
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)

/*************
 ** UI **
**************/

/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset Position')

lightPositionFolder
    .add(torusKnot.position, 'x')
    .min(-5)
    .max(5)
    .step(0.1)

*/

/**********************
 ** DOM INTERACTIONS **
**********************/

//domObject
const domObject = {
    part: 1, 
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
    fifthChange: false,
}

// continue-reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    // reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false
    domObject.fifthChange = false

    // reset directional light
    directionalLight.position.set (10, 2, 0)
}

// first change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
} 

// third change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

// fifth change
document.querySelector('#fifth-change').onclick = function() {
    domObject.fifthChange = true
}

/*********************
 ** ANIMATION LOOP **
*********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects 
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 3

    // Update directionalLightHelper
    // directionalLightHelper.update()

    // Controls
    controls.update()

    // DOM INTERACTION

    // part 1
    if(domObject.part === 1){
        camera.position.set(1.1, 0.3, 2)
        camera.lookAt(-5, 0, 2)
        //camera.lookAt(caveFloor.position)
    }

    // part 2 
    if(domObject.part === 2){
        camera.position.set(8, 3.5, 9)
        camera.lookAt(0, 0, 0)

    }

    // first-change
    if(domObject.firstChange) {
        coneSquare.rotation.z = 0.15
        coneCircle.rotation.z = 0.2
    }

    // second-change
    if(domObject.secondChange) {
        coneSquare.rotation.z = 1.5
        coneCircle.rotation.z = 1.5
    }

    // third-change
    if(domObject.thirdChange) {
        coneSquare.rotation.z = elapsedTime 
        coneCircle.rotation.z = elapsedTime 
    }

    // fourth-change
    if(domObject.fourthChange) {
        coneSquare.rotation.z = 1.5
        coneCircle.rotation.z = 1.5 
    }

    if(domObject.fifthChange) {
        var newConeGeometry = new THREE.ConeGeometry(2, 2, 4)
        coneCircle.geometry = newConeGeometry;
        var newSquareGeometry = new THREE.ConeGeometry(2, 2, 32)
        coneSquare.geometry = newSquareGeometry;
   
    }

    // Renderer
    renderer.render(scene,camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()