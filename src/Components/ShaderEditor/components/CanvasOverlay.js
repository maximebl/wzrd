import React from 'react';

export const CanvasOverlay = (props) => (
    <div>
        <canvas
            id="canvas"
            style={props.style}
            width={props.width}
            height={props.height}>
        </canvas>
    </div>
)