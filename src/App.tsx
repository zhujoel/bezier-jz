import React from "react";
import Canvas from "./graphics/Canvas";

export default function App() {
    return (
        <div className="App">
            Hello world, here is my canvas:
            <br />
            <Canvas height={500} width={500} />
        </div>
    );
}
