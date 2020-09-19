import Display from "./util/display.js"
import Sphere from "./util/sphere.js";
import { Lensflare, LensflareElement } from "../modules/three/Lensflare.js ";

class IndexDisplay extends Display {
    constructor(id) {
        super(id);
    }

    setupScene(scene) {
        const sphere = new Sphere(scene, this._camera, 1, [0, 0, 0],
            'assets/textures/Earth.jpg', 'assets/textures/earth_bump_map.jpg',
            'assets/textures/earth_specular_map.png',
            'assets/textures/EarthShell.png', this._texture_loader, 0x93cfef);
        this.setupLighting();
        this.setupLensFlare();
        this.setupControls();
        return [sphere];
    }

    setupLighting() {
        let light = new THREE.SpotLight(0xffffff, 2, 0, 5, 1);
        light.position.set(2, 2, 2);
        this._scene.add(light);
    }

    setupLensFlare() {
        let textureFlare0 = this._texture_loader.load( 'assets/textures/lensflare0.png' );
        let textureFlare3 = this._texture_loader.load( 'assets/textures/lensflare3.png' );
        addLight( this._scene,0.55, 0.9, 0.5, 1, 1, - 1000 );
        addLight( this._scene,0.08, 0.8, 0.5, -1, -1, - 1000 );
        addLight( this._scene,0.995, 0.5, 0.9, -1, 1, - 1000 );
        addLight( this._scene,0.995, 0.5, 0.9, 1, -1, - 1000 );
        addLight( this._scene,0.08, 0.8, 0.5, 0, 0, - 1000 );

        function addLight( scene, h, s, l, x, y, z ) {
            let light = new THREE.PointLight( 0xffffff, 1.5, 20000 );
            light.color.setHSL( h, s, l );
            light.position.set( x, y, z );
            scene.add( light );

            let lensflare = new Lensflare();
            lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
            lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
            lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
            lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
            lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
            lensflare.castShadow = true;
            light.add( lensflare );
        }
    }

    setupControls() {
        this._controls.minDistance = 3;
        this._controls.maxDistance = 20;
        this._controls.target = new THREE.Vector3(0, 0, 0);
        this._controls.enablePan = false;
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