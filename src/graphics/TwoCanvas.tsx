import React, { useEffect, useRef } from "react";
import { BezierCurve } from "../geometry/Bezier";
import { Point2D } from "../geometry/Point2D";
import { clear, drawPoint2D, drawPoints2D } from "./Draw";

export type TwoCanvasProps = {
    width: number;
    height: number;
    setOnDraw: (draw: () => void) => void;
    setOnClear: (clear: () => void) => void;
};

/** 2D Canvas */
export default function TwoCanvas(props: TwoCanvasProps) {
    const { width, height, setOnDraw, setOnClear } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = () => canvasRef.current.getContext("2d");
    useEffect(() => {
        canvasRef.current.addEventListener("click", (e: MouseEvent) =>
            onClick(e.offsetX, e.offsetY)
        );
    }, []);

    const controlPoints = useRef<Point2D[]>([]);

    function onClick(x: number, y: number) {
        drawPoint2D(new Point2D(x, y), context());
        controlPoints.current.push(new Point2D(x, y));
    }

    setOnClear(() => {
        clear(width, height, context());
        controlPoints.current = [];
    });

    setOnDraw(() => {
        drawPoints2D(
            BezierCurve(controlPoints.current, 0.005) as Point2D[],
            context()
        );
        controlPoints.current = [];
    });

    return (
        <canvas
            style={{ backgroundColor: "lightblue" }}
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
}
