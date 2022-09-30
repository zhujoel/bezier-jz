import React, { useEffect, useRef } from "react";
import { BezierCurve } from "../geometry/Bezier";
import { Point } from "../geometry/Point";
import { clear, drawPoints } from "./Draw";

export type CanvasProps = {
    width: number;
    height: number;
};

export default function Canvas(props: CanvasProps) {
    const { width, height } = props;

    // Initialize canvas and context
    const canvasRef = useRef<HTMLCanvasElement>(null);
    var context: CanvasRenderingContext2D;
    useEffect(() => {
        // canvas is only defined after rendering
        context = canvasRef.current.getContext("2d");
    }, []);

    return (
        <div>
            <div>
                <button
                    onClick={() =>
                        drawPoints(
                            BezierCurve(
                                [
                                    new Point(50, 50),
                                    new Point(150, 150),
                                    new Point(50, 350),
                                ],
                                0.1
                            ),
                            context
                        )
                    }
                >
                    Draw
                </button>
                <button onClick={() => clear(width, height, context)}>
                    Clear
                </button>
            </div>
            <canvas
                style={{ backgroundColor: "lightblue" }}
                ref={canvasRef}
                width={width}
                height={height}
            />
        </div>
    );
}
