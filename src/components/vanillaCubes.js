// This code is not used, it will be used to create a three fiber version of the useless web cubes for the project model.

const clock = new THREE.Clock();

let cube, cubes, cubesGroup, scene, camera, renderer, controls, song;
let geometry, material;

let cubeCount = { x: 5, y: 5, z: 5 };
let cubeSpacing = { x: 1.5, y: 1.5, z: 1.5 };
let cubeSize = { x: 1, y: 1, z: 1 };

function makeInstance(geometry, material, x, y, z) {
  cube = new THREE.Mesh(geometry, material); // Cube mesh. Mesh object takes geometry and applies a material.
  scene.add(cube); // Adds the cube, default coords 0,0,0
  cubesGroup.add(cube);

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;

  return cube;
}

function drawCubes() {
  material = new THREE.MeshNormalMaterial(); // Colors cube with RGB
  geometry = new THREE.BoxGeometry(cubeSize.x, cubeSize.y, cubeSize.z); // Contains all vertices & faces (points & fill) for cube.
  cubesGroup = new THREE.Group();
  cubes = [];
  for (let x = 0; x < cubeCount.x; x++) {
    for (let y = 0; y < cubeCount.y; y++) {
      for (let z = 0; z < cubeCount.z; z++) {
        const positionX = (x - (cubeCount.x - 1) / 2) * cubeSpacing.x;
        const positionY = (y - (cubeCount.y - 1) / 2) * cubeSpacing.y;
        const positionZ = (z - (cubeCount.z - 1) / 2) * cubeSpacing.z;
        cubes.push(
          makeInstance(geometry, material, positionX, positionY, positionZ)
        );
      }
    }
  }
  scene.add(cubesGroup);
}

function animate(timestamp) {
  requestAnimationFrame(animate);

  let time = timestamp * 0.001; // Time elapsed ms → seconds

  // pattern, inside animation loop
  if (cubeSpacing.x === 4) {
    scene.remove(cubesGroup);
    Object.assign(cubeCount, { x: 20, y: 20, z: 1 });
    Object.assign(cubeSpacing, { x: 1.1, y: 1.1, z: 1.1 });
    Object.assign(cubeSize, { x: 1, y: 1, z: 1 });
    drawCubes();
  }

  let currentX = cube.position.x;
  let currentY = cube.position.y;

  cube.position.z = Math.sin(
    time * 3 + Math.sqrt(currentX * currentX + currentY * currentY)
  );
  cube.rotation.x = time * 1.5;

  cubesGroup.rotation.y = Math.sin(time * 0.5) * 0.2;

  cubesGroup.scale.y = Math.sin(time * 0.22) * 1.1;
  cubesGroup.scale.x = Math.sin(time * 0.22) * 1.1;
}
