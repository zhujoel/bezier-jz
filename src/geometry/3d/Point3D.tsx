import React from "react";

export class Point3D {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    Times(n: number): Point3D {
        return new Point3D(this.x * n, this.y * n, this.z * n);
    }

    Add(p: Point3D): Point3D {
        return new Point3D(this.x + p.x, this.y + p.y, (this.z = p.z));
    }
}
