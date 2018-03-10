import React from 'react';
import {compose, withHandlers, lifecycle} from "recompose";
import {Observable} from "rxjs";
import {clearLine, drawLineToCursor} from "../../../utils/rendering";

const onDragSubscription = card => e => {
    drawLineToCursor(e, card);
};

const onDragCompleted = (e) => {
    clearLine();
};

const onDragError = (e) => {
    console.log('LineDrag Error : ', e)
};

const createLineDragInstance = (card, $drags) => {
    $drags.subscribe(
            onDragSubscription(card),
            onDragError,
            onDragCompleted
        );
};

const createConnectionsInstance = ($connections) => {
    $connections.subscribe((x) => {
        console.log('CONNECTION : ', x)
    })
}

export const withLineDrag = compose(
    withHandlers(() => {
        let card = undefined;
        return {
            onRef: () => (ref) => (card = ref),
            getCurrentCard: () => () => card
        }
    }),
    lifecycle({
        componentDidMount: function () {
            const card = this.props.getCurrentCard();
            const container = document.getElementById('container');

            const $containerMouseMoves = Observable.fromEvent(container, 'mousemove').do((e) => {
                e.stopPropagation()
            });
            const $containerMouseUps = Observable.fromEvent(container, 'mouseup').do((e) => {
                e.stopPropagation()
            });

            const $cardMousedowns = Observable.fromEvent(card, 'mousedown').do((e) => {
                e.stopPropagation();
                e.preventDefault();
            });

            const $mouseMovesUntilMouseUps = $containerMouseMoves.takeUntil($containerMouseUps);

            const $connections = $mouseMovesUntilMouseUps
                .filter(e => e.target.className === 'input')

            $cardMousedowns.subscribe((x) => {
                createLineDragInstance(card, $mouseMovesUntilMouseUps);
                createConnectionsInstance($connections);
            })
        }
    })
);
