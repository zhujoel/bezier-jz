export class Point2D implements Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    Times(n: number): Point2D {
        return new Point2D(this.x * n, this.y * n);
    }

    Add(p: Point2D): Point2D {
        return new Point2D(this.x + p.x, this.y + p.y);
    }
}
