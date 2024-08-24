import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


//지구의 축을 실제 처럼 약간 기울어지게 만들어줌
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI/ 180;
scene.add(earthGroup);

//지구 주변에 별 추가
const stars = getStarfield({numStars:2000});
scene.add(stars);

new OrbitControls(camera, renderer.domElement)
const loader = new THREE.TextureLoader();
const geometry  = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
    // color: 0xffff00,
    // flatShading : true,
    map: loader.load("./textures/earthmap1k.jpg"),
})
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh)

//빛 추가 
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
// scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate(){
    requestAnimationFrame(animate);

    // earthMesh.rotation.x += 0.01;
    earthMesh.rotation.y += 0.002;

    renderer.render(scene,camera);
    // controls.update();//궤도 조정 업데이트
}

animate()