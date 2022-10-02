import React, { useEffect, useRef, useState } from "react";
import { BezierCurve } from "../geometry/Bezier";
import { Point } from "../geometry/Point";
import { clear, drawPoint, drawPoints } from "./Draw";
import ThreeCanvas from "./ThreeCanvas";

export type CanvasProps = {
    width: number;
    height: number;
};

export default function Canvas(props: CanvasProps) {
    const { width, height } = props;

    const [isTwoDimensional, setIsTwoDimensional] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = () => canvasRef.current.getContext("2d");
    useEffect(() => {
        canvasRef.current.addEventListener("click", (e: MouseEvent) =>
            onClick(e.offsetX, e.offsetY)
        );
    }, []);

    const controlPoints = useRef<Point[]>([]);

    function onClick(x: number, y: number) {
        drawPoint(new Point(x, y), context());
        controlPoints.current.push(new Point(x, y));
    }

    function onClear() {
        clear(width, height, context());
        controlPoints.current = [];
    }

    function onDraw() {
        drawPoints(BezierCurve(controlPoints.current, 0.005), context());
        controlPoints.current = [];
    }

    return (
        <div>
            <div>
                <button onClick={onDraw}>Draw</button>
                <button onClick={onClear}>Clear</button>
                <button onClick={() => setIsTwoDimensional(!isTwoDimensional)}>
                    2D
                </button>
            </div>
            {isTwoDimensional ? (
                <canvas
                    style={{ backgroundColor: "lightblue" }}
                    ref={canvasRef}
                    width={width}
                    height={height}
                />
            ) : (
                <ThreeCanvas />
            )}
        </div>
    );
}
