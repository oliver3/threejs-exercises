(function () {
    function Camera() {
        const camera = new THREE.PerspectiveCamera(
            70,                                   // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1,                                  // Near clipping pane
            1000                                  // Far clipping pane
        );
        // Reposition the camera
        camera.position.set(60, 60, 0);

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
            new THREE.BoxGeometry(100, .1, 100),
            shadowMaterial
        );
        groundMesh.receiveShadow = true;

        return groundMesh;
    }

    const renderer = Renderer();

    const camera = Camera();

    function Decoration() {
        const decoration = new THREE.Group();

        // A random color assignment
        const colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

        // The main bauble is an Octahedron
        const bauble = new THREE.Mesh(
            new THREE.OctahedronGeometry(12, 1),
            new THREE.MeshStandardMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                shading: THREE.FlatShading,
                metalness: 0,
                roughness: 1
            })
        );
        bauble.castShadow = true;
        bauble.receiveShadow = true;
        bauble.rotateZ(Math.random() * Math.PI * 2);
        bauble.rotateY(Math.random() * Math.PI * 2);

        decoration.add(bauble);

        // A cylinder to represent the top attachment
        const shapeOne = new THREE.Mesh(
            new THREE.CylinderGeometry(4, 6, 10, 6, 1),
            new THREE.MeshStandardMaterial({
                color: 0xf8db08,
                shading: THREE.FlatShading,
                metalness: 0,
                roughness: 1
            })
        );
        shapeOne.position.y += 8;
        shapeOne.castShadow = true;
        shapeOne.receiveShadow = true;
        decoration.add(shapeOne);

        decoration.position.y += 12;

        return decoration;
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

    const decorations = [[-10, -20], [10, 10]].map(([x, z]) => {
        const d = Decoration();
        d.position.x += x;
        d.position.z += z;
        return d;
    });

    const scene = Scene(Plane(), AmbientLight(), PointLight(), ...decorations);


    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    function render() {
        // Update camera position based on the controls
        controls.update();

        // Loop through items in the scene and update their position
        decorations.forEach((d) => {
            d.rotation.y += 0.01;
        });

        // Re-render the scene
        renderer.render(scene, camera);

        // Loop
        requestAnimationFrame(render);
    }

    render();

})();