import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BezierCurve } from "../geometry/Bezier";
import { Point3D } from "../geometry/Point3D";
import { drawPoint3D, drawPoints3D } from "./Draw";

export type ThreeCanvasProps = {
    width: number;
    height: number;
    setOnDraw: (draw: () => void) => void;
    setOnClear: (clear: () => void) => void;
};

/** 3D Canvas */
export default function ThreeCanvas(props: ThreeCanvasProps) {
    const { width, height, setOnDraw, setOnClear } = props;

    // Added points
    const controlPoints = useRef<Point3D[]>([]);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("lightblue");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    useEffect(() => {
        document.getElementById("3d-canvas").replaceWith(renderer.domElement);
    }, []);

    function intializeScene() {
        // XYZ Axis
        const axesHelper = new THREE.AxesHelper(1);
        scene.add(axesHelper);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.mouseButtons = {
            RIGHT: THREE.MOUSE.ROTATE,
        };

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

        // Raycaster to detect mouse collision with cube
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        document.addEventListener("click", (e: MouseEvent) => {
            pointer.x = (e.offsetX / width) * 2 - 1;
            pointer.y = -(e.offsetY / height) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObject(cube, false);

            // Act
            if (intersects.length > 0) {
                const point = new Point3D(
                    intersects[0].point.x,
                    intersects[0].point.y,
                    intersects[0].point.z
                );
                drawPoint3D(point, scene);
                controlPoints.current.push(point);
            }
        });
    }
    intializeScene();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    setOnDraw(() => {
        drawPoints3D(
            BezierCurve(controlPoints.current, 0.01) as Point3D[],
            scene
        );
        controlPoints.current = [];
    });

    setOnClear(() => {
        scene.clear();
        intializeScene();
        controlPoints.current = [];
    });

    return (
        <div>
            <div id="3d-canvas"></div>
        </div>
    );
}
