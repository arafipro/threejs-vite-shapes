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

const lightColor = 0xffffff;
const intensity = 5;
const light = new THREE.DirectionalLight(lightColor, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const geometries = [
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.ConeGeometry(0.8, 1.5, 32),
  new THREE.TorusGeometry(0.6, 0.2, 16, 100),
  new THREE.OctahedronGeometry(0.8),
  new THREE.TetrahedronGeometry(0.8),
];

const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const normalMaterial = new THREE.MeshNormalMaterial();
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

geometries.forEach((geo, i) => {
  const meshBasic = new THREE.Mesh(geo, basicMaterial);
  const meshNormal = new THREE.Mesh(geo, normalMaterial);
  const meshPhong = new THREE.Mesh(geo, phongMaterial);

  meshBasic.position.set((i - 2) * 2.2, 2, 0);
  meshNormal.position.set((i - 2) * 2.2, 0, 0);
  meshPhong.position.set((i - 2) * 2.2, -2, 0);

  scene.add(meshBasic);
  scene.add(meshNormal);
  scene.add(meshPhong);

  function animate() {
    requestAnimationFrame(animate);

    meshBasic.rotation.x += 0.01;
    meshBasic.rotation.y += 0.01;
    meshNormal.rotation.x += 0.01;
    meshNormal.rotation.y += 0.01;
    meshPhong.rotation.x += 0.01;
    meshPhong.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
});
