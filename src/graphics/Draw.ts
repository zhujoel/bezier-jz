import { Point } from "../geometry/Point";

export function drawPoint(point: Point, ctx: CanvasRenderingContext2D){
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
export function drawPoints(points: Point[], ctx: CanvasRenderingContext2D, options?: DrawOptions | undefined){
    var promise = Promise.resolve();

    points.forEach((p) => {
        promise = promise.then(
            () =>
                new Promise((resolve) => {
                    drawPoint(p, ctx);
                    setTimeout(resolve, options?.delay ?? 0);
                })
        );
    });
}

export function clear(width: number, height: number, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, width, height);
}