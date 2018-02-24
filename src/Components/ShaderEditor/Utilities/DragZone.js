import React from 'react';
import {
    createEventHandler,
    compose,
    withHandlers,
    lifecycle,
    withProps,
} from "recompose";
import {Observable} from "rxjs";
import {append, head, map, reduce} from "ramda";

const onSubscription = (card, container) => e => {
    console.log('SUB')
    card.style.left = (e.clientX - container.offsetLeft) + "px";
    card.style.top = (e.clientY - container.offsetTop) + "px";
}

const onCompleted = (e) => {
    console.log('COMPLETED')
};

const onError = (e) => {
    console.log(e)
};

const createDragInstance = (card, $drags, container) => {
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

     return <div className="DragZoneClass" style={localStyleSheet} onMouseDown={props.DragZoneMouseDowns} ref={props.onRef}>
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
        withProps(() => {
            const {handler: DragZoneMouseDowns, stream: $dragZoneMouseDown} = createEventHandler();
            return ({DragZoneMouseDowns, $dragZoneMouseDown})
        }),
        lifecycle({
            componentDidMount: function() {
                const {getCurrentCard} = this.props;
                let card = getCurrentCard();

                const allChildren = append(head(card.childNodes), head(card.childNodes).childNodes);

                const createObservables = (childNode) =>
                    Observable.fromEvent(childNode, 'mouseup').do((e) => {e.stopImmediatePropagation()})

                const mergeObservables = (observable, x) => {
                    console.log(observable)
                };

                let $childElementsMouseUps = map(createObservables, allChildren).reduce(mergeObservables, Observable.empty());

                const container = document.getElementById('container');

                let $cardMouseDowns = Observable.fromEvent(card, 'mousedown').do((e) => { e.stopImmediatePropagation() });
                let $containerMouseMoves = Observable.fromEvent(container, 'mousemove').do((e) => { e.stopImmediatePropagation() });
                let $containerMouseUps = Observable.fromEvent(container, 'mouseup').do((e) => { e.stopImmediatePropagation() });

                let $stopConditions = Observable.merge($containerMouseUps, $childElementsMouseUps);

                let $drags = $containerMouseMoves.takeUntil($stopConditions)

                $cardMouseDowns.subscribe(() => {
                    console.log('CREATING')
                    createDragInstance(card, $drags, container);
                })
            }
        })
    )(DragZoneBase)

