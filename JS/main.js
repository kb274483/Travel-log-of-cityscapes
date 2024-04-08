import * as THREE from "three" ; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { scrollEvent } from "./mouseScroll";
import { touchEventStart,touchEventEnd } from "./touchEvent";
import cityJson from "../assets/city.json"

const init = ()=>{
  document.addEventListener('wheel',scrollEvent)
  document.addEventListener('touchstart',touchEventStart)
  document.addEventListener('touchend',touchEventEnd)

  let cityName = document.getElementById("cityName")
  let photo = document.getElementById("photo")
  let sideBar = document.getElementById("cityList")
  let sideBarStyle = ["w-full","text-sky-900","text-lg","font-bold","transition-all","duration-500","ease-linear"]

  cityName.textContent = cityJson.cityArr[0].name
  photo.src = cityJson.cityArr[0].src
  cityJson.cityArr.forEach((city,idx)=>{
    let div = document.createElement('div')
    div.textContent = city.name
    div.classList.add(...sideBarStyle)
    if(idx === 0) {
      div.classList.remove("text-sky-900")
      div.classList.add("text-white")
    }
    sideBar.appendChild(div)
  })
}
const setThreeJS = ()=>{
  const canvas = document.querySelector('canvas.webgl')
  // Render
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
  })
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth,window.innerHeight)

  // Scene
  const scene = new THREE.Scene();
  
  // Light
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 2, 3); 
  scene.add( hemisphereLight , directionalLight );
  
  //Camera 
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5
  scene.add(camera)

  // Control
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  // Obj
  const geometry = new THREE.BoxGeometry(3, 3, 3)
  const material = new THREE.MeshStandardMaterial({ color: 0xfcd073 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(1.5,1.5,1.5)
  mesh.rotation.y = 15
  mesh.rotation.x = 10
  scene.add(mesh)

  renderer.render(scene, camera)
  
  const animate = ()=>{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
  }
  animate()
}

init()
setThreeJS()

