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
    camera.position.z = 2;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    controls.update();

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    document.addEventListener("pointermove", (e: MouseEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = function () {
        requestAnimationFrame(animate);

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(cube, false);

        if (intersects.length > 0) {
            // needs casting with Typescript: https://stackoverflow.com/questions/66818245/three-js-property-material-does-not-exist-on-type-object3d-error-when-get
            (
                (intersects[0].object as THREE.Mesh)
                    .material as THREE.MeshBasicMaterial
            ).color.set(new THREE.Color(Math.random() * 0xffffff));
        }

        // controls.update();
        renderer.render(scene, camera);
    };
    animate();

    return <></>;
}
