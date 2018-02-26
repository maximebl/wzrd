import React from 'react';
import {
    compose,
    withHandlers,
    lifecycle,
} from "recompose";
import {Observable} from "rxjs";

const onSubscription = (card, container) => e => {
    card.style.left = (e.clientX - container.offsetLeft) + "px";
    card.style.top = (e.clientY - container.offsetTop) + "px";
}

const onCompleted = (e) => {
};

const onError = (e) => {
    console.log('DragZone Error : ', e)
};

const createDragZoneInstance = (card, $drags, container) => {
    $drags.subscribe(
            onSubscription(card, container),
            onError,
            onCompleted)
}

const DragZoneBase = (props) => {

    let localStyleSheet = {
        position: 'absolute',
        width: props.width,
        height: props.height
    };

     return <div className="DragZoneClass" style={localStyleSheet} ref={props.onRef}>
        {props.children}
    </div>
}

export const DragZone =
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

                let $cardMouseDowns = Observable.fromEvent(card, 'mousedown').do((e) => { e.stopImmediatePropagation(); e.preventDefault() });

                let $drags = $containerMouseMoves.takeUntil($containerMouseUps)

                $cardMouseDowns.subscribe(() => {
                    createDragZoneInstance(card, $drags, container);
                })
            }
        })
    )(DragZoneBase)

