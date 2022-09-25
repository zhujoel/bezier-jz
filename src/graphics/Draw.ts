import { Point } from "../geometry/Point";

function drawPoint(point: Point, ctx: CanvasRenderingContext2D){
    ctx.strokeRect(point.x, point.y, 1, 1);
}

/**
 * Draw a list of points sequentially.
 * @param points Points to draw.
 */
export function drawPoints(points: Point[], ctx: CanvasRenderingContext2D){
    var promise = Promise.resolve();

    points.forEach((p) => {
        promise = promise.then(
            () =>
                new Promise((resolve) => {
                    drawPoint(p, ctx);
                    setTimeout(resolve, 100);
                })
        );
    });
}

export function clear(ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, 1000, 1000);
}