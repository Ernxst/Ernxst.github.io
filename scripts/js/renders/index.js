import Display from "./util/display.js"
import Sphere from "./util/sphere.js";

class IndexDisplay extends Display {
    constructor(id) {
        super(id);
    }

    setupScene(scene) {
        const sphere = new Sphere(scene, 2, [0, 0, 0],
            'assets/textures/Earth.jpg', this._texture_loader);
        return [sphere, sphere];
    }

    setupCamera(camera) {
        this._camera.position.z = 5;
    }

    render() {
        for (let object of this._objects) {
            object.rotate(0.005, 0.005, 0.005);
        }
    }
}

let display = new IndexDisplay('index-container');
display.run();