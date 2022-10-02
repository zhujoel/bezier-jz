import { Point2D } from "../geometry/Point2D";
import { Point3D } from "../geometry/Point3D";
import * as THREE from "three";

/** 
 * 2D Draw functions
 */

export function drawPoint2D(point: Point2D, ctx: CanvasRenderingContext2D){
    ctx.strokeRect(point.x, point.y, 1, 1);
}

type DrawOptions = {
    delay: number;
}

/**
 * Draw a list of points sequentially.
 * @param points Points to draw.
 * @param options 
 */
export function drawPoints2D(points: Point2D[], ctx: CanvasRenderingContext2D, options?: DrawOptions | undefined){
    var promise = Promise.resolve();

    points.forEach((p) => {
        promise = promise.then(
            () =>
                new Promise((resolve) => {
                    drawPoint2D(p, ctx);
                    setTimeout(resolve, options?.delay ?? 0);
                })
        );
    });
}

export function clear(width: number, height: number, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, width, height);
}

/** 
 * 3D Draw functions
 */

export function drawPoint3D(point: Point3D, scene: THREE.Scene) {
    scene.add(SphereMesh(point.x, point.y, point.z));
}


export function drawPoints3D(points: Point3D[], scene: THREE.Scene, options?: DrawOptions | undefined){
    var promise = Promise.resolve();

    points.forEach((p) => {
        promise = promise.then(
            () =>
                new Promise((resolve) => {
                    drawPoint3D(p, scene);
                    setTimeout(resolve, options?.delay ?? 0);
                })
        );
    });
}

function SphereMesh(x: number, y: number, z: number): THREE.Mesh {
    const circle = new THREE.Mesh(
        new THREE.SphereGeometry(),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
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