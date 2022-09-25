import { Point } from "../geometry/Point";

function drawPoint(point: Point, ctx: CanvasRenderingContext2D){
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

export function clear(ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, 1000, 1000);
}