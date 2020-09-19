import Display from "./util/display.js"
import Sphere from "./util/sphere.js";

class IndexDisplay extends Display {
    constructor(id) {
        super(id);
    }

    setupScene(scene) {
        const sphere = new Sphere(scene, this._camera, 1, [0, 0, 0],
            'assets/textures/Earth.jpg', 'assets/textures/earth_bump_map.jpg',
            'assets/textures/earth_specular_map.png',
            'assets/textures/EarthShell.png', this._texture_loader, 0x93cfef);
        this.setupLighting()
        return [sphere];
    }

    setupLighting() {
        let light = new THREE.SpotLight(0xffffff, 2, 0, 5, 1);
        light.position.set(2, 2, 2);
        this._scene.add(light);
    }

    setupCamera(camera) {
        this._camera.position.z = 4;
    }

    render() {
        for (let object of this._objects) {
            object.rotate(0.005, 0.005, 0.005);
        }
    }
}

let display = new IndexDisplay('index-container');
display.run();