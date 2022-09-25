import React from "react";

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Times(n: number): Point {
        return new Point(this.x * n, this.y * n);
    }

    Plus(n: number): Point {
        return new Point(this.x + n, this.y + n);
    }

    Add(p: Point): Point {
        return new Point(this.x + p.x, this.y + p.y);
    }
}
