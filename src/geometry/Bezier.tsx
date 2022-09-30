import React from "react";
import { Point } from "./Point";

export function Lerp(p0: Point, p1: Point, t: number): Point {
    return p0.Times(1 - t).Add(p1.Times(t));
}

export function DeCasteljau(points: Point[], t: number): Point {
    var p = points[0];
    for (var i = 1; i < points.length; ++i) {
        p = Lerp(p, points[i], t);
    }
    return p;
}

/**
 * Get points from two control points p0 and p1 at a given step.
 * A linear bézier curve is a straight line.
 */
export function Linear(
    p0: Point,
    p1: Point,
    step?: number | undefined
): Point[] {
    const definedStep = step ?? 0.01;

    const points = [];
    for (var t = 0; t <= 1; t = Add(t, definedStep)) {
        points.push(Lerp(p0, p1, t));
    }
    return points;
}

/**
 * For rounding issues on decimals
 */
function Add(a: number, b: number): number {
    return parseFloat((a + b).toFixed(6));
}
