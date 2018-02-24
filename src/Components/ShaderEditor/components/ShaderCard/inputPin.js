import React from 'react';
import {compose, lifecycle} from 'recompose';
import {addInput} from "../../reducers/inputs";
import {connect} from 'react-redux';
import {withDragAndDrop} from "../pinDrag";
import {withLineDrag} from "../../Utilities/LineDrag";

const styleSheet = {
    input: {
        position: 'relative',
        height: 20,
        width: 20,
        left: 0,
        top: 20,
        float: 'left'
    }
}

const InputPinBase = (props) => (
    <div id={props.uid}
         onMouseDown={props.inputPinMouseDowns}
         onMouseUp={props.inputPinMouseUps}
         ref={props.onRef}
         className="noConnection"
         style={styleSheet.input}>
    </div>
)

export const InputPin = compose(
    // withState('uid', 'updateUid', undefined),
    connect((state) => (
            {inputs: state.inputs}
        ),
        {addInput}
    ),
    lifecycle({
        componentWillMount: function () {
            // let newId = _.uniqueId('_');
            // this.props.updateUid(newId);
        },
        componentWillReceiveProps(nextProps) {
            // if (this.props.uid === undefined) {
            //     const input = factoryInput(nextProps);
            //     this.props.addInput(input);
            // }
        }
    }),
    withLineDrag
)(InputPinBase);

// function pinDrag(pin, inContainer) {
//
//     let curveCanvas = document.getElementById('curveCanvas');
//     let $mouseMoves = Observable.fromEvent(inContainer, 'mousemove');
//     let $mouseUps = Observable.fromEvent(inContainer, 'mouseup');
//
//     let $pinMouseDowns = Observable.fromEvent(pin, 'mousedown');
//
//     let $drags = $pinMouseDowns.mergeMap((e) => $mouseMoves.takeUntil($mouseUps));
//
//     $drags.subscribe((e)=>{drawLineToCursor(e, curveCanvas, pin, inContainer)});
// }

function drawLineToCursor(mouseEvent, targetCanvas, pinElement, containerElement) {
    let ctx = targetCanvas.getContext("2d");
    let inputX = (pinElement.getBoundingClientRect().left - containerElement.offsetLeft) + (pinElement.getBoundingClientRect().width / 2);
    let inputY = (pinElement.getBoundingClientRect().bottom - containerElement.offsetTop) - (pinElement.getBoundingClientRect().height / 2);
    ctx.clearRect(
        0,
        0,
        containerElement.getBoundingClientRect().width,
        containerElement.getBoundingClientRect().height
    );
    ctx.beginPath();
    ctx.moveTo(inputX, inputY);
    ctx.lineTo(mouseEvent.clientX - containerElement.offsetLeft, mouseEvent.clientY - containerElement.offsetTop);
    ctx.strokeStyle = 'green';
    ctx.stroke();
}

let tmpProto = {};

function factoryInput(props) {
    return Object.create(tmpProto, {
        id: {
            writable: true,
            enumerable: true,
            configurable: true,
            value: props.uid
        },
        owner: {
            writable: true,
            enumerable: true,
            configurable: true,
            value: props.owner
        },
        index: {
            writable: true,
            enumerable: true,
            configurable: true,
            value: props.index
        },
    })
}