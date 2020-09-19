export default class Display {
    _id;
    _canvas;
    _WIDTH;
    _HEIGHT;
    _scene;
    _camera;
    _renderer;
    _texture_loader;
    _objects;

    constructor(id) {
        this._id = id;
        this._canvas = document.getElementById(id);
        this._WIDTH = this._canvas.clientWidth;
        this._HEIGHT = this._canvas.clientHeight;

        setInterval(this._resize.bind(this), 250);
        this._setupRender();
        this._objects = this.setupScene(this._scene)
        this.setupCamera()
    }

    _resize() {
        let width = this._canvas.clientWidth;
        let height = this._canvas.clientHeight;

        if (width !== this._WIDTH || ! (height - 4 <= this._HEIGHT <= height + 4)) {
            this._WIDTH = width;
            this._HEIGHT = height;

            this._renderer.setSize(this._WIDTH, this._HEIGHT);
            this._camera.aspect = this._WIDTH / this._HEIGHT;
            this._camera.updateProjectionMatrix();
        }
    }

    _setupRender() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(45, this._WIDTH / this._HEIGHT, 0.1, 1500);
        this._renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this._renderer.setSize(this._WIDTH, this._HEIGHT);
        this._canvas.appendChild(this._renderer.domElement);
        this._texture_loader = new THREE.TextureLoader();
    }

    setupScene(scene) {
        // Create and return a drawing list of 3d objects
    }

    setupCamera(camera) {
        // Define camera settings here
    }

    _animate() {
        requestAnimationFrame(this._animate.bind(this));
        this.render();
        this._renderer.render(this._scene, this._camera);
    }

    render() {
        // Defines how the objects in the drawing list are animated
    }

    run() {
        this._animate();
    }
}