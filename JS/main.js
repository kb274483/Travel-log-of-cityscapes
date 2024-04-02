import * as THREE from "three" ; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { scrollEvent } from "./mouseScroll";
import { touchEventStart,touchEventEnd } from "./touchEvent";
import cityJson from "../assets/city.json"


const init =()=>{
  document.addEventListener('wheel',scrollEvent)
  document.addEventListener('touchstart',touchEventStart)
  document.addEventListener('touchend',touchEventEnd)

  let sideBar = document.getElementById("cityList")
  let sideBarStyle = ["w-full","text-sky-900","text-lg","font-bold","transition-all","duration-500","ease-linear"]
  cityJson.cityArr.forEach((city,idx)=>{
    let div = document.createElement('div')
    div.textContent = city
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
    canvas: canvas
  })
  renderer.setSize(window.innerWidth,window.innerHeight)

  // Scene
  const scene = new THREE.Scene();
  
  // Light
  const light = new THREE.AmbientLight( 0x404040 )
  scene.add(light)
  
  //Camera 
  const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 0.1,1000);
  camera.position.z = 5
  scene.add(camera)

  // Control
  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.update();

  const vertexShader = `
    uniform vec2 mousePos;
    void main() {
      vec3 newPos = position + vec3(mousePos.x * 0.9, mousePos.y * 0.9, 0.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `;

  const fragmentShader = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // 白色
    }
  `;

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      mousePos: { value: new THREE.Vector2(0, 0) }
    }
  });

  // Obj
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, shaderMaterial)
  scene.add(mesh)

  document.addEventListener('mousemove', (event) => {
    shaderMaterial.uniforms.mousePos.value.x = (event.clientX / window.innerWidth) * 2 - 1;
    shaderMaterial.uniforms.mousePos.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  renderer.render(scene, camera)
  
  const animate = ()=>{
    requestAnimationFrame( animate );
    // controls.update();
    renderer.render( scene, camera );
  }
  animate()
}

init()
setThreeJS()

