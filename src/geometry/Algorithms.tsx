import React from 'react';
import { Point } from './Point';

export function LinearInterpolation(p0: Point, p1: Point, t: number): Point{
    return p0.Times(1-t).Add(p1.Times(t));
}

export function DeCasteljau(points: Point[], n: number): Point{
    var p = points[0];
    for (var i = 1; i < points.length; ++i){
        p = LinearInterpolation(p, points[i], n);
    }
    return p;
}