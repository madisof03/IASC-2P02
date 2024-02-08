import * as THREE from "three"

/**********
** SCENE **
**********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#2F3E46')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)
   
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/******************
** MESHES **
******************/

//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color ('#76A398')
})
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

//different cases
//const pascalCase -- variables 
//const CamelCase -- three.js 
//const snake_case

testSphere.position.set(0, 0, -5)
scene.add(testSphere)

/******************
** ANIMATION LOOP **
******************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    // Animate testSphere
    testSphere.position.z = Math.sin(elapsedTime)

    // Renderer
    renderer.render(scene,camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()