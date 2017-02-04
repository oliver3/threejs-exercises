(function () {
    function Camera() {
        const camera = new THREE.PerspectiveCamera(
            75,                                   // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1,                                  // Near clipping pane
            1000                                  // Far clipping pane
        );
        // Reposition the camera
        camera.position.set(5, 5, 0);

        // Point the camera at a given coordinate
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        return camera;
    }


    function Scene(...objects: THREE.Object3D[]) {
        const scene = new THREE.Scene();
        objects.forEach((object) => scene.add(object));
        return scene;
    }

    function Renderer() {
        const renderer = new THREE.WebGLRenderer({antialias: true});

        // Size should be the same as the window
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Set a near white clear color (default is black)
        renderer.setClearColor(0xeeeeee);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(renderer.domElement);
        return renderer;
    }

    function Plane(): THREE.Object3D {
        // A basic material that shows the geometry wireframe.
        const shadowMaterial = new THREE.ShadowMaterial();

        shadowMaterial.opacity = 0.5;
        const groundMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 100, .1, 100 ),
            shadowMaterial
        );
        groundMesh.receiveShadow = true;

        return groundMesh;

    }

    const renderer = Renderer();

    const camera = Camera();

    // const cube = Cube(10, 0x00aaaa);
    //
    // const line = Line(0x0000ff);

    function ShapeOne() {
        const geometry = new THREE.OctahedronGeometry(10,1);

        const material = new THREE.MeshStandardMaterial( {
            color: 0xff0051,
            shading: THREE.FlatShading, // default is THREE.SmoothShading
            metalness: 0,
            roughness: 1
        } );

        const shapeOne = new THREE.Mesh(geometry, material);
        shapeOne.position.y += 10;
        shapeOne.castShadow = true;
        shapeOne.receiveShadow = true;

        return shapeOne
    }

    function AmbientLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        return ambientLight
    }

    function PointLight() {
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(25, 50, 25);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        return pointLight
    }

    const scene = Scene(Plane(), ShapeOne(), AmbientLight(), PointLight());


    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => { renderer.render(scene, camera); });

    renderer.render(scene, camera);

})();