import React from 'react';
import {
    compose,
    withHandlers,
    lifecycle,
} from "recompose";
import {Observable} from "rxjs";

const onSubscription = () => e => {
}

const onCompleted = (e) => {
};

const onError = (e) => {
};

// const createConnectionCheckInstance = (...) => {
//     $drags.subscribe(
//         onSubscription(...),
//         onError,
//         onCompleted)
// }

export const withConnectionCheck =
    compose(
        // withHandlers(() => {
        //     let card = undefined;
        //
        //     return {
        //         onRef: () => (ref) => (card = ref),
        //         getCurrentCard: () => () => card
        //     }
        // }),
        lifecycle({
            componentDidMount: function() {
                // const card = this.props.getCurrentCard();
                const newStream = this.props.$drags;

                newStream.subscribe((x) => {console.log(x)})


            }
        })
    )

