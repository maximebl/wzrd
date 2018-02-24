import React from 'react';
import {compose, lifecycle} from 'recompose';
import {Observable} from 'rxjs';
import R from 'ramda';
import {ADD_INPUT, UPDATE_STORE_INPUTS} from "../reducers/inputs";

let AllInputsIds;

const PinDragBase = (props) => <div>PIN DRAG</div>

// export const withDragAndDrop = compose(
//     lifecycle({
//         componentDidMount: function() {
//             const {mouseDowns} = this.props
//             SetupDragAndDrop(mouseDowns);
//         }
//     })
// )(PinDragBase);

export const SetupDragAndDrop = ($targetMouseDowns) => {

    let $containerMouseMoves = Observable.fromEvent(document.getElementById('container'), 'mousemove');
    let $containerMouseUps = Observable.fromEvent(document.getElementById('container'), 'mouseup');

    const $drags = $targetMouseDowns.mergeMap((e) => $containerMouseMoves.takeUntil($containerMouseUps));

    $drags.subscribe((e)=>{console.log(e)});
}

export const updateStoreInputsEpic = ($actions, store) => {

    let sample = $actions.sampleTime(1000);
    sample.subscribe(()=> AllInputsIds = store.getState().inputs);

    return $actions
        .ofType(ADD_INPUT)
        .debounceTime(1000)
        .mapTo(updateStoreInputs());
};

export const updateStoreInputs = (val) => ({type: UPDATE_STORE_INPUTS, payload: val});