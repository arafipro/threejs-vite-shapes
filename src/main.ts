import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080);

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas!,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const boxWidth = 1.5;
const boxHeight = 1.5;
const boxDepth = 1.5;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const edge = new THREE.EdgesGeometry(geometry);
const lines = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.LineSegments(edge, lines);
scene.add(line);

const lightColor = 0xffffff;
const intensity = 5;
const light = new THREE.DirectionalLight(lightColor, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
