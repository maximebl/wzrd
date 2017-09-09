import React from 'react';
import {connect} from 'react-redux'
import './ShaderEditor.css';
import {compose, lifecycle} from 'recompose';
import {Observable} from 'rxjs';
import {updateCanvasDimensions} from "./reducers/canvasOverlay";
import {CanvasOverlay} from "./components/canvasOverlay";
import {addScalar} from "./reducers/scalars";
import {addOperator} from "./reducers/operators";
import {Scalar} from "./components/Scalar/Scalar";
import {Add} from "./components/Add/Add";

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
                {props.scalars.map(scalar=> (
                    <Scalar key={scalar.id + 'key'}
                            id={scalar.id}
                            value={scalar.value}
                            styleSheet={scalar.styleSheet}
                            container={scalar.container}/>
                    ))}
                {props.operators.map(operator=> (
                    <Add key={operator.id + 'key'}
                         id={operator.id}
                         styleSheet={operator.styleSheet}
                         container={operator.container}/>
                ))}
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
            {
                scalars: state.scalars,
                operators: state.operators,
                canvasWidth: state.canvasOverlay.canvasDimensions.width,
                canvasHeight: state.canvasOverlay.canvasDimensions.height
            }),
            {updateCanvasDimensions, addScalar, addOperator}
    ),
    lifecycle({
        componentDidMount: function() {

            container = Container();

            this.props.updateCanvasDimensions({
                width: container.width(),
                height: container.height()
            });

            this.props.addScalar({
                id: 1,
                value: 2,
                container: container.element(),
                styleSheet: styleSheet.redCard,
                linkedTo: []
            });

            this.props.addOperator({
                id: 2,
                container: container.element(),
                styleSheet: styleSheet.blueCard
            });

        },
        componentDidUpdate(){
            // drawCurve();
        }
    }),
)(ShaderEditorBase);

let container;

const Container = () => {
    let el = document.getElementById('container');

    let publicAPI = {
        element: () => el,
        width: () => el.getBoundingClientRect().width,
        height: () => el.getBoundingClientRect().height
    }
    return publicAPI;
}

const Draw = () => {
  // get output pos from Scalar
  // get input pos from Add
}

const drawCurve = () => {
    let curveCanvas = document.getElementById('curveCanvas');
    let ctx = curveCanvas.getContext("2d");

    let blueCard = document.getElementById('blueCard');
    let redCard = document.getElementById('redCard');
    let container = document.getElementById('container');

    let startX = redCard.getBoundingClientRect().left + (redCard.getBoundingClientRect().width / 2);
    let startY = (redCard.getBoundingClientRect().bottom - container.offsetTop) - (redCard.getBoundingClientRect().height / 2);

    let endX = 0;
    let endY = 0;

    let cpHandle = {x:0, y:0};

    let $cpMouseDowns = Observable
        .fromEvent(container, 'mousedown')
        .subscribe((e) => {
            cpHandle = {x: e.clientX / 2, y: (e.clientY - e.currentTarget.offsetTop) / 2}
            ctx.fillStyle = 'yellow';
            ctx.fillRect(cpHandle.x, cpHandle.y, 10, 10);
        });

    let $cpMouseMoves = Observable
        .fromEvent(container, 'mousemove')
        .subscribe((e) => {
            endX = e.clientX;
            endY = e.clientY - e.currentTarget.offsetTop;
        });

    let $cpMouseUps = Observable
        .fromEvent(container, 'mouseup')
        .subscribe((e) => {
            draw();
        });

    const draw = () => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpHandle.x, cpHandle.y, endX, endY);

        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

}

