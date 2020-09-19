export default class Object {
    _object;

    constructor() {
        if (new.target === Object) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    rotate(x, y, z) {
        this._object.rotation.x += x;
        this._object.rotation.y += y;
        this._object.rotation.z += z;
    }

    rotateX(increment) {
        this._object.rotation.x += increment;
    }

    rotateY(increment) {
        this._object.rotation.y += increment;
    }

    rotateZ(increment) {
        this._object.rotation.z += increment;
    }

    position(x, y, z) {
        this._object.x = x;
        this._object.y = y;
        this._object.z = z;
    }

    translate(xIncrement, yIncrement, zIncrement) {
        this.translateX(xIncrement);
        this.translateY(yIncrement);
        this.translateZ(zIncrement);
    }

    translateX(increment) {
        this._object.translateX(increment);
    }

    translateY(increment) {
        this._object.translateY(increment);
    }

    translateZ(increment) {
        this._object.translateZ(increment);
    }

    location() {
        return [this._object.x, this._object.y, this._object.z];
    }

    x() {
        return this._object.x;
    }

    y() {
        return this._object.y;
    }

    z() {
        return this._object.z;
    }

    clone() {

    }

    add(object3D) {
        this._object.add(object3D);
    }

    remove(object3D) {
        this._object.remove(object3D);
    }
}