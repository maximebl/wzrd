import React from 'react';

export const CanvasOverlay = (props) => {
    return(
        <div>
            <canvas
                id="curveCanvas"
                style={props.style}
                width={props.width}
                height={props.height}>
            </canvas>
        </div>
        )
}