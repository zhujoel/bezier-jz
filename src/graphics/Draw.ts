import { Point2D } from "../geometry/Point2D";
import { Point3D } from "../geometry/Point3D";
import { Scene, Mesh, SphereGeometry, MeshBasicMaterial } from "three";

export function drawPoint2D(point: Point2D, ctx: CanvasRenderingContext2D){
    ctx.strokeRect(point.x, point.y, 1, 1);
}

export function drawPoint3D(point: Point3D, scene: Scene) {
    scene.add(SphereMesh(point.x, point.y, point.z));
}

/** 
 * Draw objects with a small delay inbetween each draw to force an animation effect. 
 * Otherwise the draw can be almost instantaneous.
 */
export function drawObjectsAnimated<T>(objects: T[], drawOneObject: (object: T) => void, options?: DrawOptions | undefined) {
    var promise = Promise.resolve();

    objects.forEach((o) => {
        promise = promise.then(
            () =>
                new Promise((resolve) => {
                    drawOneObject(o);
                    setTimeout(resolve, options?.delay ?? 0);
                })
        );
    });
}

type DrawOptions = {
    delay: number;
}

function SphereMesh(x: number, y: number, z: number): Mesh {
    const circle = new Mesh(
        new SphereGeometry(),
        new MeshBasicMaterial({
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