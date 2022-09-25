import React, { useEffect, useRef } from "react";
import { Line } from "../geometry/Algorithms";
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
            <canvas ref={canvasRef} width={width} height={height} />
            <br />
            <button
                onClick={() =>
                    drawPoints(generatePoints(100, width, height), context, {
                        delay: 10,
                    })
                }
            >
                Draw random points
            </button>
            <button
                onClick={() =>
                    drawPoints(
                        Line(new Point(0, 0), new Point(100, 100)),
                        context
                    )
                }
            >
                Draw random line
            </button>
            <button onClick={() => clear(context)}>Clear</button>
        </div>
    );
}

function generatePoints(amount: number, width: number, height: number) {
    const points: Point[] = [];
    for (var i = 0; i < amount; ++i) {
        points.push(new Point(Math.random() * width, Math.random() * height));
    }
    return points;
}
