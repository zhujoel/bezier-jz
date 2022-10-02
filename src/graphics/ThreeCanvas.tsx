import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/** ThreeJS */
export default function ThreeCanvas() {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("lightblue");

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // Edges of the cube
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    scene.add(edges);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.mouseButtons = {
        RIGHT: THREE.MOUSE.ROTATE,
    };
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    controls.update();

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    document.addEventListener("click", (e: MouseEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(cube, false);

        // Act
        if (intersects.length > 0) {
            scene.add(
                SphereMesh(
                    intersects[0].point.x,
                    intersects[0].point.y,
                    intersects[0].point.z
                )
            );
        }
    });

    const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    return <></>;
}

function SphereMesh(x: number, y: number, z: number): THREE.Mesh {
    const circle = new THREE.Mesh(
        new THREE.SphereGeometry(),
        new THREE.MeshBasicMaterial({
            color: 0xffffff * Math.random(),
        })
    );
    circle.position.x = x;
    circle.position.y = y;
    circle.position.z = z;
    circle.scale.x = 0.01;
    circle.scale.y = 0.01;
    circle.scale.z = 0.01;
    return circle;
}
