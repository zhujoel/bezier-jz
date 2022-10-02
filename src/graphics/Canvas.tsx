import React, { useRef, useState } from "react";
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
