import React, { useEffect, useRef } from "react";
import { BezierCurve } from "../geometry/Bezier";
import { Point2D } from "../geometry/Point2D";
import { drawObjectsAnimated, drawPoint2D } from "./Draw";

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
        canvasRef.current.addEventListener("click", (e: MouseEvent) => {
            drawPoint2D(new Point2D(e.offsetX, e.offsetY), context());
            controlPoints.current.push(new Point2D(e.offsetX, e.offsetY));
        });
    }, []);

    const controlPoints = useRef<Point2D[]>([]);

    setOnClear(() => {
        context().clearRect(0, 0, width, height);
        controlPoints.current = [];
    });

    setOnDraw(() => {
        drawObjectsAnimated<Point2D>(
            BezierCurve(controlPoints.current, 0.005) as Point2D[],
            (point) => drawPoint2D(point, context())
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
