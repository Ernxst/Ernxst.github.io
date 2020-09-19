import Object from "./object.js";

export default class Sphere extends Object {
    SLICES = 32;
    radius;
    texture;
    _texLocation;
    _textureLoader
    _shell;
    _glow;

    constructor(scene, camera = undefined, radius = 1,
                position = [0, 0, 0],
                texture = undefined, bumpMap = undefined,
                specularMap = undefined, shell = undefined,
                textureLoader = undefined, glow = undefined,
                intensity = 0.7, fade = 7, shadows = true) {
        super();
        this.radius = radius;
        this._textureLoader = textureLoader;
        this._texLocation = texture;

        const geometry = new THREE.SphereGeometry(radius, this.SLICES, this.SLICES);
        this._setTexture(texture, bumpMap, specularMap);
        this._object = new THREE.Mesh(geometry, this.texture);
        if (shadows === true) {
            this._object.receiveShadow = true;
            this._object.castShadows = true;
        }

        if (shell !== undefined) {
            this._shell = this._createShell(shell);
            this._object.add(this._shell);
        }

        if (glow !== undefined) {
            this._glow = this._createGlow(camera, glow, intensity, fade);
            this._object.add(this._glow)
        }

        scene.add(this._object);
        this.position(...position);
    }

    _setTexture(texture, bumpMap, specularMap) {
        if (texture !== undefined && this._textureLoader !== undefined) {
            let _tex = this._textureLoader.load(texture);
            let _bumpMap;
            let _specularMap;

            if (bumpMap !== undefined) {
                _bumpMap = this._textureLoader.load(bumpMap);
            }

            if (specularMap !== undefined) {
                _specularMap = this._textureLoader.load(specularMap);
            }

            this.texture = new THREE.MeshPhongMaterial(
                {
                    map: _tex,
                    shininess: 10,
                    bumpMap: _bumpMap,
                    bumpScale: 0.05,
                    specularMap: _specularMap,
                    specular: new THREE.Color('grey')
                },
            );
        } else {
            this.texture = new THREE.MeshBasicMaterial({color: 0xffffff});
        }
    }

    _createShell(shell) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(this.radius * 1.02, this.SLICES, this.SLICES),
            new THREE.MeshPhongMaterial({
                map: this._textureLoader.load(shell),
                opacity: 0.8,
                transparent: true,
            })
        );
    }

    _createGlow(camera, colour, intensity, fade) {
        let geometry = new THREE.SphereGeometry(1.03, this.SLICES, this.SLICES);

        let glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                'c': {
                    type: 'f',
                    value: intensity
                },
                'p': {
                    type: 'f',
                    value: fade
                },
                glowColor: {
                    type: 'c',
                    value: new THREE.Color(colour)
                },
                viewVector: {
                    type: 'v3',
                    value: camera.position
                }
            },
            vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
            ,
            fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`
            ,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        return new THREE.Mesh(geometry, glowMaterial);
    }


}