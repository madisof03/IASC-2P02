import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
 ** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
 ** SCENE **
***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#2F3E46')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(2, 2, 4)
scene.add(camera)

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
*************/
// plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color ('#84A98C'), 
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.rotation.x = Math.PI * 0.5
scene.add(plane)

// testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color ('#76A398')
})
const testSphere = new THREE.Mesh(geometry, material)

scene.add(testSphere)

const torusGeometry = new THREE.TorusGeometry(2, 0.8)
const torus = new THREE.Mesh(torusGeometry, material)

/************
 ** UI **
 ************/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {}
uiObject.play = false

//Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder.add(planeMaterial, 'wireframe')

//Sphere UI
const sphereFolder = ui.addFolder('Sphere')

sphereFolder
    .add(testSphere.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Height')

sphereFolder
    .add(uiObject, 'play')
    .name('Animate Sphere')

/**********************
  ** ANIMATION LOOP **
***********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Sphere
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * 2) * 10
    }

    // Controls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation ()