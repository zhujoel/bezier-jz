import React, { useEffect, useRef } from "react";
import { Point } from "../geometry/Point";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const p1 = new Point(50, 50);
    const p2 = new Point(100, 150);

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context: CanvasRenderingContext2D = canvas.getContext("2d");
        draw(context);
    }, [draw]);

    return <canvas ref={canvasRef} width="200" height="200" />;
}
