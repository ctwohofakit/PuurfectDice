// script.js
let scene, camera, renderer;
let dice = [];

function init() {
scene = new THREE.Scene();
scene.background = new THREE.Color(0x20252f);

camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

  // Add light
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

animate();
}

function animate() {
requestAnimationFrame(animate);
renderer.render(scene, camera);
}

init();
//create
function createDie() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create materials for each face with numbers
    const materials = [];
    for (let i = 1; i <= 6; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('3d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 256, 256);
    context.fillStyle = '#000000';
    context.font = '200px Arial';
    context.fillText(i, 80, 180);
    const texture = new THREE.CanvasTexture(canvas);
    materials.push(new THREE.MeshBasicMaterial({ map: texture }));
}

    const die = new THREE.Mesh(geometry, materials);
    die.rotation.x = Math.random() * Math.PI;
    die.rotation.y = Math.random() * Math.PI;
    scene.add(die);
    dice.push(die);
}
document.getElementById('addDie').addEventListener('click', () => {
    createDie();
});
document.getElementById('rollDice').addEventListener('click', () => {
    let rolling = true;
    const rollDuration = 2000; // Roll for 2 seconds
    const startTime = Date.now();

    function rollAnimation() {
    if (!rolling) return;
    const elapsed = Date.now() - startTime;
    if (elapsed < rollDuration) {
        dice.forEach(die => {
        die.rotation.x += 0.1;
        die.rotation.y += 0.1;
        });
        requestAnimationFrame(rollAnimation);
    } else {
        rolling = false;
        showResults();
    }
    }

    rollAnimation();
});

function showResults() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    dice.forEach((die, index) => {
      // Generate random number between 1 and 6
      const result = Math.floor(Math.random() * 6) + 1;
    resultDiv.innerHTML += `Die ${index + 1}: ${result}<br>`;
    });
}
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});