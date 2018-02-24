import React from 'react';
import {createEventHandler, compose, withHandlers, lifecycle, withProps} from "recompose";
import {Observable} from "rxjs";
import {clearLine, drawLineToCursor} from "../../../utils/rendering";

const onSubscription = card => e => {
    drawLineToCursor(e, card);
    card.style.backgroundColor = "greenyellow";
};

const onCompleted = (e) => {
    clearLine();
};

const onError = (e) => {
};

const createDragInstance = (card, $drags) => {
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
        withProps(() => {
            const {handler: inputpinmousedowns, stream: $linedragmousedown} = createEventHandler();
            const {handler: inputpinmouseups, stream: $inputpinmouseup} = createEventHandler();
            return ({inputpinmousedowns, $linedragmousedown, inputpinmouseups, $inputpinmouseup})
        }),
        lifecycle({
            componentDidMount: function() {
                const {getCurrentCard} = this.props;
                let card = getCurrentCard();

                let container = document.getElementById('container');

                let $containerMouseMoves = Observable.fromEvent(container, 'mousemove').do((e) => { e.stopImmediatePropagation() });
                let $containerMouseUps = Observable.fromEvent(container, 'mouseup').do((e) => { e.stopImmediatePropagation() });
                let $cardMousedowns = Observable.fromEvent(card, 'mousedown').do((e) => { e.stopImmediatePropagation() });

                let $drags = $containerMouseMoves.takeUntil($containerMouseUps);

                $cardMousedowns.subscribe(() => {
                    createDragInstance(card, $drags);
                })
            }
        })
    );
