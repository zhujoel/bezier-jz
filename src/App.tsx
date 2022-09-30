import React from "react";
import Canvas from "./graphics/Canvas";

export default function App() {
    return (
        <div className="App">
            Canvas:
            <Canvas height={800} width={1200} />
        </div>
    );
}
