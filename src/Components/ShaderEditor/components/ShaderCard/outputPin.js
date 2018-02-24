import React from 'react';
import {compose, lifecycle, withState} from 'recompose';
import {Observable} from 'rxjs';
import {connect} from 'react-redux';
import {addOutput} from "../../reducers/outputs";
import _ from "lodash";
import R from 'ramda';

const localStyleSheet = {
    position: 'relative',
    height: 20,
    width: 20,
    float: 'right'
}

const OutputPinBase = (props) => (
    <div id={props.uid} className="noConnection" style={localStyleSheet}></div>
)

export const OutputPin = compose(
    connect((state) => ({
        outputs: state.outputs,
        inputs: state.inputs,
        nodes: state.nodes
    }),
        {addOutput}
    ),
    // withState('uid', 'updateUid', undefined),
    lifecycle({
        componentWillMount: function() {
            // this.props.updateUid(_.uniqueId('_'));
        },
        componentDidMount: function() {

        },
        componentDidUpdate: function(prevProps) {
            if(prevProps.uid === undefined) {
                // let pin = document.getElementById(this.props.uid);
                // pinDrag(this.props, pin, this.props.container);
            }
        },
        componentWillReceiveProps(nextProps){
            // if(this.props.uid === undefined){
            //     const output = factoryOutput(nextProps);
            //     this.props.addOutput(output);
            // }
        }
    })
)(OutputPinBase);

// function pinDrag(props, pin, inContainer) {
//     let curveCanvas = document.getElementById('curveCanvas');
//     let $mouseMoves = Observable.fromEvent(inContainer, 'mousemove');
//     let $mouseUps = Observable.fromEvent(inContainer, 'mouseup');
//
//     let $pinMouseDowns = Observable.fromEvent(pin, 'mousedown');
//
//     let $pinMouseOver = Observable.fromEvent(inContainer, 'mouseover');
//
//     let $drags = $pinMouseDowns.mergeMap((e) => $mouseMoves.takeUntil($mouseUps));
//
//     let $inputIds = Observable.from(props.inputs).map((input)=>input.id);
//     $inputIds.subscribe((e)=>console.log(e))
//
//     let AllInputsIds = R.map((input) => input.id, props.inputs)
//
//     let isInput = (id) => R.contains(id, AllInputsIds);
//
//     let $dragsOnInput = $drags
//         .map((move) => move.target.id)
//         .filter((id) => isInput(id))
//
//     let $pinMouseOut = Observable.fromEvent(inContainer, 'mouseout');
//
//     let $inputMouseOut = $pinMouseOut
//         .map((move) => move.target.id)
//         .filter((id) => _.includes(_.map(props.inputs, (input) => input.id), id))
//
//     let $hoveringInput = $pinMouseOver
//         .map((move)=> move.target.id)
//         .filter((id) => _.includes(_.map(props.inputs, (input)=>input.id), id))
//
//     $dragsOnInput.subscribe((e)=>console.log('drags on input: ',e))
//
//     let $dragAndHover = $dragsOnInput.mergeMap((e)=> {
//         return $hoveringInput.takeUntil($mouseUps);
//     })
//
//     $drags.subscribe((e)=>{drawLineToCursor(e, curveCanvas, pin, inContainer)});
//     $dragAndHover.subscribe(showValidConnection);
//     $inputMouseOut.subscribe(showInvalidConnection)
// }

const showValidConnection = (e) => {
    const target = document.getElementById(e);
    target.className = "validConnection";
}

const showInvalidConnection = (e) => {
    const target = document.getElementById(e);
    target.className = "noConnection";
}

function drawLineToCursor(mouseEvent, targetCanvas, pinElement, containerElement) {
    let ctx = targetCanvas.getContext("2d");
    let inputX = (pinElement.getBoundingClientRect().left - containerElement.offsetLeft) + (pinElement.getBoundingClientRect().width  / 2);
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
function factoryOutput(props) {
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