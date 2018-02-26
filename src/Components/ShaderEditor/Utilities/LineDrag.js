import React from 'react';
import {compose, withHandlers, lifecycle} from "recompose";
import {Observable} from "rxjs";
import {clearLine, drawLineToCursor} from "../../../utils/rendering";

const onSubscription = card => e => {
    drawLineToCursor(e, card);
};

const onCompleted = (e) => {
    clearLine();
};

const onError = (e) => {
    console.log('LineDrag Error : ', e)
};

const createLineDragInstance = (card, $drags) => {
    $drags.subscribe(
            onSubscription(card),
            onError,
            onCompleted
        );
};

export const withLineDrag =
    compose(
        withHandlers(() => {
            let card = undefined;
            return {
                onRef: () => (ref) => (card = ref),
                getCurrentCard: () => () => card
            }
        }),
        lifecycle({
            componentDidMount: function() {
                let card = this.props.getCurrentCard();
                let container = document.getElementById('container');

                let $containerMouseMoves = Observable.fromEvent(container, 'mousemove').do((e) => { e.stopImmediatePropagation() });
                let $containerMouseUps = Observable.fromEvent(container, 'mouseup').do((e) => { e.stopImmediatePropagation() });

                let $cardMousedowns = Observable.fromEvent(card, 'mousedown').do((e) => { e.stopImmediatePropagation(); e.preventDefault() });

                let $drags = $containerMouseMoves.takeUntil($containerMouseUps);

                $cardMousedowns.subscribe(() => {
                    createLineDragInstance(card, $drags);
                })
            }
        })
    );
