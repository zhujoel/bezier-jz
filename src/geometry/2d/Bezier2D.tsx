import React from "react";
import { Point2D } from "./Point2D";

export function Lerp(p0: Point2D, p1: Point2D, t: number): Point2D {
    return p0.Times(1 - t).Add(p1.Times(t));
}

export function DeCasteljau(points: Point2D[], t: number): Point2D {
    if (points.length === 0) {
        throw new Error("Unable to compute on no point"); // Error state: should not happen
    }
    if (points.length === 1) {
        return points[0];
    }
    const lerps = [];
    for (var i = 1; i < points.length; ++i) {
        lerps.push(Lerp(points[i - 1], points[i], t));
    }
    return DeCasteljau(lerps, t);
}

/**
 * Computes all points in a Bézier curve using any number of control points and a given step between each point.
 * @param points Control points of a Bézier curve. The curve is guaranteed to start at the first given point and finish at the last given point.
 * @param step Step between each points in the curve.
 * @returns All points of the curve.
 */
export function BezierCurve(
    points: Point2D[],
    step?: number | undefined
): Point2D[] {
    const definedStep = step ?? 0.01;
    const bezier = [];
    for (var t = 0; t <= 1; t = Add(t, definedStep)) {
        const p = DeCasteljau(points, t);
        bezier.push(p);
    }
    return bezier;
}

/**
 * For rounding issues on decimals
 */
function Add(a: number, b: number): number {
    return parseFloat((a + b).toFixed(6));
}
