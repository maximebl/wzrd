import React from 'react';
import {Observable} from 'rxjs';
import {compose, lifecycle} from 'recompose';

const tmpStyle = {
    output: {
        position: 'relative',
        backgroundColor: 'gray',
        height: 20,
        width: 20,
        left: 200
    },
    input: {
        position: 'relative',
        backgroundColor: 'gray',
        height: 20,
        width: 20,
        left: 0
    }
}

const ShaderCardBase = (props) => {
    return(
        <div id={props.id} style={props.styleSheet}>
            <div id="input" style={tmpStyle.input}>input</div>
            <div id="output" style={tmpStyle.output}>output</div>
        </div>
    )
}

export const ShaderCard = compose(
    lifecycle({
        componentDidMount: function() {
            let el = document.getElementById(this.props.id);
            const ShaderCard = factoryShaderCard(el);
            ShaderCard.dragAndDrop(el, this.props.container)
        },
    })
)(ShaderCardBase);

const proto = {
    dragAndDrop(el, container) {
        let $mouseMoves = Observable.fromEvent(container, 'mousemove');
        let $mouseUps = Observable.fromEvent(container, 'mouseup');
        let $mouseDowns = Observable.fromEvent(el, 'mousedown');

        let $drags = $mouseDowns.mergeMap((e) => {
            return $mouseMoves.takeUntil($mouseUps)
        });

        $drags.subscribe((e) => {
            el.style.left = e.clientX + 'px';
            el.style.top = (e.clientY - e.currentTarget.offsetTop) + 'px';
        });
    }
};

function factoryShaderCard (el) {
    return Object.create(proto, {
        element: {
            writable: true,
            configurable: true,
            value: el
        },
        width: {
            writable: true,
            configurable: true,
            value: el.getBoundingClientRect().width
        },
        height: {
            writable: true,
            configurable: true,
            value: el.getBoundingClientRect().height
        }
    })
}

