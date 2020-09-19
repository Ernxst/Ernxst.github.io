import Object from "./object.js";

export default class Sphere extends Object {
    SLICES = 64;
    radius;
    texture;
    _texLocation;

    constructor(scene, radius = 1, position = [0, 0, 0],
                texture = undefined,
                textureLoader = undefined) {
        super();
        const geometry = new THREE.SphereGeometry(radius, this.SLICES, this.SLICES);
        if (texture !== undefined && textureLoader !== undefined) {
            const _tex = textureLoader.load(texture);
            this._texLocation = texture
            this.texture = new THREE.MeshBasicMaterial({map: _tex});
        }
        else {
            this.texture =  new THREE.MeshBasicMaterial({color: 0xffffff});
        }
        this.texture.side = THREE.DoubleSide;
        this._object = new THREE.Mesh(geometry, this.texture);
        this.radius = radius;

        scene.add(this._object);
        this.position(...position);
    }


}