import React from 'react';
import {connect} from 'react-redux'
import './ShaderEditor.css';
import {compose, lifecycle, withProps} from 'recompose';
import {Observable} from 'rxjs';
import {updateCanvasDimensions} from "./reducers/canvasOverlay";
import {CanvasOverlay} from "./components/canvasOverlay";

const styleSheet = {
    redCard: {
        position: 'absolute',
        backgroundColor: 'red',
        height: 200,
        width: 200,
        left: 0
    },
    blueCard: {
        position: 'absolute',
        backgroundColor: 'blue',
        height: 200,
        width: 200,
        left: 250
    },
    container: {
        position: 'relative',
        width: 1000,
        height: 400,
        backgroundColor: 'pink'
    },
    canvasOverlay:{
        pointerEvents:'none',
        position:'absolute',
        left: 0
    }
}

function ShaderEditorBase(props) {
    return (
        <div>
            <div className="ShaderEditor-header">
                <h2>Shader Editor</h2>
            </div>
            <div id="container" style={styleSheet.container}>
                <div id="redCard" style={styleSheet.redCard}></div>
                <div id="blueCard" style={styleSheet.blueCard}></div>
                <CanvasOverlay
                    width={props.canvasWidth}
                    height={props.canvasHeight}
                    style={styleSheet.canvasOverlay}>
                </CanvasOverlay>
            </div>
        </div>
    );
}

export const ShaderEditor = compose(
    connect((state) => (
            {canvasWidth: state.canvasOverlay.canvasDimensions.width, 
            canvasHeight: state.canvasOverlay.canvasDimensions.height}),
            {updateCanvasDimensions}
    ),
    lifecycle({
        componentDidMount: function () {
            canvasContainer = Container();
            this.props.updateCanvasDimensions({
                width: canvasContainer.width(),
                height: canvasContainer.height()
            });

            let redCard = document.getElementById('redCard');
            let container = document.getElementById('container');

            let $mouseMoves = Observable.fromEvent(container, 'mousemove');
            let $mouseUps = Observable.fromEvent(container, 'mouseup');
            let $mouseDowns = Observable.fromEvent(redCard, 'mousedown');

            let $drags = $mouseDowns.mergeMap((e) => {
                return $mouseMoves.takeUntil($mouseUps)
            });

            $drags.subscribe((e) => {
                redCard.style.left = e.clientX + 'px';
                redCard.style.top = (e.clientY - e.currentTarget.offsetTop) + 'px';
            });
        },
        componentDidUpdate(){
            drawCurve();
        }
    }),
)(ShaderEditorBase);

let canvasContainer;

const Container = () => {
    let container = document.getElementById('container');

    let publicAPI = {
        width: () => container.getBoundingClientRect().width,
        height: () => container.getBoundingClientRect().height
    }
    return publicAPI;
}

const drawCurve = () => {
    let curveCanvas = document.getElementById('curveCanvas');

    let ctx = curveCanvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.moveTo(0,0);
    ctx.lineTo(500, 50);
    ctx.stroke();
}

