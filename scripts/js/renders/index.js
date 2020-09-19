import Display from "./display.js"

class IndexDisplay extends Display {
    constructor(id) {
        super(id);
    }

    setupScene(scene) {
        const geometry = new THREE.SphereGeometry(20, 64, 64);
        const material = new THREE.MeshNormalMaterial();
        const sphere = new THREE.Mesh(geometry, material);

        sphere.scale.x = 0.1;
        sphere.scale.y = 0.1;
        sphere.scale.z = 0.1;

        scene.add(sphere);

        const frontSpot = new THREE.SpotLight(0xeeeece);
        frontSpot.position.set(1000, 1000, 1000);
        scene.add(frontSpot);

        const frontSpot2 = new THREE.SpotLight(0xddddce);
        frontSpot2.position.set(-500, -500, -500);
        scene.add(frontSpot2);
        return [sphere];
    }

    setupCamera(camera) {
        this._camera.position.z = 5;
    }

    render() {
        for (let object of this._objects) {
            object.rotation.x += 0.005;
            object.rotation.y += 0.005;
            object.rotation.z += 0.005;
        }
    }
}

let display = new IndexDisplay('index-container');
display.run();