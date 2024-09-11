import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

// Scene
const scene = new THREE.Scene();

// Create multiple shapes with spacing
const shapes = [
  {
    geometry: new THREE.SphereGeometry(3, 64, 64),
    position: { x: -10, y: 0, z: 0 },
  }, // Sphere
  { geometry: new THREE.BoxGeometry(4, 4, 4), position: { x: 10, y: 5, z: 0 } }, // Cube
  {
    geometry: new THREE.ConeGeometry(3, 6, 64),
    position: { x: 0, y: -5, z: 10 },
  }, // Cone
  {
    geometry: new THREE.TorusGeometry(3, 1, 64, 100),
    position: { x: 0, y: 10, z: -10 },
  }, // Torus
];

// Create materials with random colors
const materials = shapes.map(() => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    roughness: 0.5,
  });
});

// Create meshes for all shapes, add to scene, and set their position
const meshes = shapes.map(({ geometry, position }, index) => {
  const mesh = new THREE.Mesh(geometry, materials[index]);
  mesh.position.set(position.x, position.y, position.z);
  scene.add(mesh);
  return mesh;
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Create multiple lights from different directions
const lights = [
  new THREE.PointLight(0xffffff, 100, 100), // Light from top
  new THREE.PointLight(0xff0000, 100, 100), // Light from bottom
  new THREE.PointLight(0x00ff00, 100, 100), // Light from right
  new THREE.PointLight(0x0000ff, 100, 100), // Light from left
];

// Position lights uniquely for each shape
lights[0].position.set(0, 20, 10); // Top light
lights[1].position.set(0, -20, 10); // Bottom light
lights[2].position.set(20, 0, 10); // Right light
lights[3].position.set(-20, 0, 10); // Left light

// Add lights to the scene
lights.forEach((light) => scene.add(light));

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 30;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enablePan = true;
controls.autoRotate = false;

// Resize event
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

// Create a unique rotation speed for each shape
const rotationSpeeds = meshes.map(() => ({
  x: Math.random() * 0.05,
  y: Math.random() * 0.05,
  z: Math.random() * 0.05,
}));

// Animation loop with independent rotations
const loop = () => {
  meshes.forEach((mesh, index) => {
    // Apply unique rotation speeds to each mesh
    mesh.rotation.x += rotationSpeeds[index].x;
    mesh.rotation.y += rotationSpeeds[index].y;
    mesh.rotation.z += rotationSpeeds[index].z;
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline animation for scale
meshes.forEach((mesh) => {
  const tl = gsap.timeline({ defaults: { duration: 1 } });
  tl.fromTo(mesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
});

// Mouse interaction for color change
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    rgb = [Math.random() * 255, Math.random() * 255, Math.random() * 255];

    // Update the color for all meshes
    const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    meshes.forEach((mesh) => {
      gsap.to(mesh.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
      });
    });
  }
});

// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import gsap from "gsap";

// // Scene
// const scene = new THREE.Scene();

// // Create multiple shapes with spacing
// const shapes = [
//   {
//     geometry: new THREE.SphereGeometry(3, 64, 64),
//     position: { x: -10, y: 0, z: 0 },
//   }, // Sphere
//   { geometry: new THREE.BoxGeometry(4, 4, 4), position: { x: 10, y: 5, z: 0 } }, // Cube
//   {
//     geometry: new THREE.ConeGeometry(3, 6, 64),
//     position: { x: 0, y: -5, z: 10 },
//   }, // Cone
//   {
//     geometry: new THREE.TorusGeometry(3, 1, 64, 100),
//     position: { x: 0, y: 10, z: -10 },
//   }, // Torus
//   {
//     geometry: new THREE.DodecahedronGeometry(3),
//     position: { x: -15, y: -10, z: 5 },
//   }, // Dodecahedron
//   {
//     geometry: new THREE.OctahedronGeometry(3),
//     position: { x: 15, y: 10, z: -5 },
//   }, // Octahedron
// ];

// // Create materials with random colors
// const materials = shapes.map(() => {
//   return new THREE.MeshStandardMaterial({
//     color: new THREE.Color(Math.random(), Math.random(), Math.random()),
//     roughness: 0.5,
//   });
// });

// // Create meshes for all shapes, add to scene, and set their position
// const meshes = shapes.map(({ geometry, position }, index) => {
//   const mesh = new THREE.Mesh(geometry, materials[index]);
//   mesh.position.set(position.x, position.y, position.z);
//   scene.add(mesh);
//   return mesh;
// });

// // Sizes
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // Create multiple lights from different directions
// const lights = [
//   new THREE.PointLight(0xffffff, 100, 100), // Light from top
//   new THREE.PointLight(0xff0000, 100, 100), // Light from bottom
//   new THREE.PointLight(0x00ff00, 100, 100), // Light from right
//   new THREE.PointLight(0x0000ff, 100, 100), // Light from left
// ];

// // Position lights uniquely for each shape
// lights[0].position.set(0, 20, 10); // Top light
// lights[1].position.set(0, -20, 10); // Bottom light
// lights[2].position.set(20, 0, 10); // Right light
// lights[3].position.set(-20, 0, 10); // Left light

// // Add lights to the scene
// lights.forEach((light) => scene.add(light));

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   45,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.z = 40;
// scene.add(camera);

// // Renderer
// const canvas = document.querySelector(".webgl");
// const renderer = new THREE.WebGLRenderer({
//   canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(2);
// renderer.render(scene, camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = true;
// controls.enablePan = true;
// controls.autoRotate = false;

// // Resize event
// window.addEventListener("resize", () => {
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   renderer.setSize(sizes.width, sizes.height);
// });

// // Create a unique rotation speed for each shape
// const rotationSpeeds = meshes.map(() => ({
//   x: Math.random() * 0.02,
//   y: Math.random() * 0.02,
//   z: Math.random() * 0.02,
// }));

// // Track scroll offset
// let scrollY = 0;

// // Scroll effect
// window.addEventListener("scroll", () => {
//   scrollY = window.scrollY;
// });

// // Animation loop with independent rotations
// const loop = () => {
//   meshes.forEach((mesh, index) => {
//     // Apply unique rotation speeds to each mesh
//     mesh.rotation.x += rotationSpeeds[index].x;
//     mesh.rotation.y += rotationSpeeds[index].y;
//     mesh.rotation.z += rotationSpeeds[index].z;

//     // Scroll effect for each shape
//     mesh.position.y += scrollY * 0.001 * (index % 2 === 0 ? 1 : -1);
//   });

//   controls.update();
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(loop);
// };
// loop();

// // Timeline animation for scale
// meshes.forEach((mesh) => {
//   const tl = gsap.timeline({ defaults: { duration: 1 } });
//   tl.fromTo(mesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
// });

// // Mouse interaction for color change on each shape separately
// window.addEventListener("mousemove", (event) => {
//   meshes.forEach((mesh, index) => {
//     const { width, height } = sizes;
//     const x = event.clientX / width - 0.5;
//     const y = event.clientY / height - 0.5;

//     // Change color based on cursor position for each shape
//     const newColor = new THREE.Color(
//       Math.abs(x * index) % 1,
//       Math.abs(y * index) % 1,
//       0.5 + 0.5 * Math.random()
//     );

//     gsap.to(mesh.material.color, {
//       r: newColor.r,
//       g: newColor.g,
//       b: newColor.b,
//     });

//     // Make each shape react to the mouse by rotating based on cursor
//     mesh.rotation.x += (y - mesh.rotation.x) * 0.05;
//     mesh.rotation.y += (x - mesh.rotation.y) * 0.05;
//   });
// });
