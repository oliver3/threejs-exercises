function Camera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}


function Scene(...objects: THREE.Object3D[]) {
    const scene = new THREE.Scene();
    objects.forEach((object) => scene.add(object));
    return scene;
}

function Renderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function Cube(size: number, color: number): THREE.Object3D {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}

function Line(color): THREE.Object3D {
    const material = new THREE.LineBasicMaterial({color});

    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    const line = new THREE.Line(geometry, material);
    return line;
}

const renderer = Renderer();

const camera = Camera();

const cube = Cube(10, 0x00aaaa);

const line = Line(0x0000ff);

const scene = Scene(cube, line);

function render() {

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();