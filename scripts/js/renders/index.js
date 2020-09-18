const canvas = document.getElementById('index-container')
let WIDTH = canvas.clientWidth
let HEIGHT = canvas.clientHeight
let ASPECT = WIDTH / HEIGHT

function threeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);
    return [scene, camera, renderer];
}

function setupScene(scene) {
    const geometry = new THREE.SphereGeometry( 20, 64, 64 );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    mesh.scale.x = 0.1;
    mesh.scale.y = 0.1;
    mesh.scale.z = 0.1;

    scene.add(mesh);

    const frontSpot = new THREE.SpotLight(0xeeeece);
    frontSpot.position.set(1000, 1000, 1000);
    scene.add(frontSpot);

    const frontSpot2 = new THREE.SpotLight(0xddddce);
    frontSpot2.position.set(-500, -500, -500);
    scene.add(frontSpot2);
    return mesh;
}

function setupCamera(camera) {
    camera.position.z = 5;
}

function animate (mesh, scene, camera, renderer) {
    requestAnimationFrame(animate);
    render(mesh)
    renderer.render(scene, camera);
}

function render (mesh) {
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.005;
}

function run() {
    let scene;
    let camera;
    let renderer;
    [scene, camera, renderer] = threeJS();
    let mesh = setupScene(scene);
    setupCamera(camera)
    animate(mesh, scene, camera, renderer);

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {
        updateVars()
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = ASPECT;
        camera.updateProjectionMatrix();
    }

    function updateVars() {
        WIDTH = canvas.clientWidth
        HEIGHT = canvas.clientHeight
        ASPECT = WIDTH / HEIGHT
    }
}

run();