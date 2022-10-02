import React, { useCallback, useEffect, useRef, useState } from "react";
import { BezierCurve } from "../geometry/Bezier";
import { Point2D } from "../geometry/Point2D";
import { clear, drawPoint2D, drawPoints2D } from "./Draw";
import ThreeCanvas from "./ThreeCanvas";
import TwoCanvas from "./TwoCanvas";

export type CanvasProps = {
    width: number;
    height: number;
};

export default function Canvas(props: CanvasProps) {
    const { width, height } = props;

    const [isTwoDimensional, setIsTwoDimensional] = useState<boolean>(true);

    const onDraw = useRef<() => void>();
    const onClear = useRef<() => void>();

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        onDraw.current();
                    }}
                >
                    Draw
                </button>
                <button
                    onClick={() => {
                        onClear.current();
                    }}
                >
                    Clear
                </button>
                <button onClick={() => setIsTwoDimensional(!isTwoDimensional)}>
                    2D
                </button>
            </div>
            {isTwoDimensional ? (
                <TwoCanvas
                    width={width}
                    height={height}
                    setOnDraw={(newOnDraw: () => void) =>
                        (onDraw.current = newOnDraw)
                    }
                    setOnClear={(newOnClear: () => void) =>
                        (onClear.current = newOnClear)
                    }
                />
            ) : (
                <ThreeCanvas
                    width={width}
                    height={height}
                    setOnDraw={(newOnDraw: () => void) =>
                        (onDraw.current = newOnDraw)
                    }
                    setOnClear={(newOnClear: () => void) =>
                        (onClear.current = newOnClear)
                    }
                />
            )}
        </div>
    );
}
