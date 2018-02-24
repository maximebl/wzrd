import React from 'react';
import {connect} from 'react-redux'
import './ShaderEditor.css';
import {compose, createEventHandler, lifecycle, setObservableConfig, withHandlers} from 'recompose';
import {updateCanvasDimensions, addLink} from "./reducers/canvasOverlay";
import {CanvasOverlay} from "./components/canvasOverlay";
import {addScalar, addVectorTwo} from "./reducers/operands";
import {addAddition} from "./reducers/operators";
import {Scalar} from "./components/Operands/Scalar";
import {Addition} from "./components/Operators/Addition";
import {generateId} from "../../utils/general";
import {addNode} from "./reducers/nodes";
import config from "recompose/rxjsObservableConfig";

setObservableConfig(config);

let styleSheet = {
    operandCard: {
        position: 'absolute',
        backgroundColor: 'red',
        left: 0
    },
    operatorCard: {
        position: 'absolute',
        backgroundColor: 'blue',
        left: 250
    },
    container: {
        position: 'relative',
        width: 1000,
        height: 1000,
        backgroundColor: 'pink'
    },
    canvasOverlay:{
        pointerEvents:'none',
        position:'absolute',
        left: 0
    }
}

export const { handler: mouseMove, stream: $containerMouseMoves } = createEventHandler();
export const { handler: mouseUp, stream: $containerMouseUps} = createEventHandler();

const ShaderEditorBase = (props) => (
    <div>
        <div className="ShaderEditor-header">
            <h2>Shader Editor</h2>
        </div>

        {/*Menu component*/}
        <button onClick={props.newNode('scalar')}>Scalar node</button>
        <button onClick={props.newNode('addition')}>Addition node</button>

        <div id="container" style={styleSheet.container} onMouseMove={mouseMove} onMouseUp={mouseUp}>
            {props.nodes.map(node => {
                if (node.type === 'scalar') {
                    return <Scalar key={node.id}
                                   id={node.id}
                                   owner={node.id}
                                   value={node.value}
                                   styleSheet={node.styleSheet}
                                   container={node.container}
                    />
                }
            }
            )}

            {props.nodes.map(node => {
                    if (node.type === 'addition') {
                        return <Addition key={node.id}
                                         id={node.id}
                                         owner={node.id}
                                         styleSheet={node.styleSheet}
                                         container={node.container}
                        />
                    }
                }
            )}

            <CanvasOverlay
                width={props.canvasWidth}
                height={props.canvasHeight}
                style={styleSheet.canvasOverlay}>
            </CanvasOverlay>
        </div>

    </div>
)

export const ShaderEditor = compose(
    connect((state) => (
            {
                nodes: state.nodes,
                canvasWidth: state.canvasOverlay.canvasDimensions.width,
                canvasHeight: state.canvasOverlay.canvasDimensions.height,
                nodeWidth: state.canvasOverlay.nodeDimensions.width,
                nodeHeight: state.canvasOverlay.nodeDimensions.height
            }),
            {updateCanvasDimensions, addScalar, addAddition, addVectorTwo, addLink, addNode}
    ),
    lifecycle({
        componentWillMount: function() {
            styleSheet.container.width = this.props.canvasWidth;
            styleSheet.container.height = this.props.canvasHeight;

            styleSheet.operandCard.width = this.props.nodeWidth;
            styleSheet.operandCard.height = this.props.nodeHeight;

            styleSheet.operatorCard.width = this.props.nodeWidth;
            styleSheet.operatorCard.height = this.props.nodeHeight;
        }
    }),
    withHandlers({
        newNode: props => type => event => {
            newNode(props, type, event);
        },
    }),
)(ShaderEditorBase);

const newNode = (props, type, event) => {
    switch (type) {
    case 'scalar':
        let scalarNode = factoryNode('scalar');
        scalarNode.styleSheet = styleSheet.operandCard;
        props.addNode(scalarNode);
        break;

    case 'addition':
        let additionNode = factoryNode('addition');
        additionNode.styleSheet = styleSheet.operatorCard;
        props.addNode(additionNode);
        break;
    default:
    }
}

const factoryNode = (type) => ({
    id: generateId(),
    type: type,
    container: document.getElementById('canvas'),
    inputs: [],
    output: [],
    styleSheet: {}
})

function newLink(nodeA, nodeB){
    addLink({input: nodeA, output: nodeB});
}

function drawLink(targetCanvas, container, startNode, endNode){
    let ctx = targetCanvas.getContext("2d");

    let startNodeX = (startNode.getBoundingClientRect().left - container.offsetLeft) + (startNode.getBoundingClientRect().width  / 2);
    let startNodeY = (startNode.getBoundingClientRect().bottom - container.offsetTop) - (startNode.getBoundingClientRect().height / 2);

    let endNodeX = (endNode.getBoundingClientRect().left - container.offsetLeft) + (endNode.getBoundingClientRect().width  / 2);
    let endNodeY = (endNode.getBoundingClientRect().bottom - container.offsetTop) - (endNode.getBoundingClientRect().height / 2);

    ctx.beginPath();
    ctx.moveTo(startNodeX, startNodeY);
    ctx.lineTo(endNodeX, endNodeY);
    ctx.strokeStyle = 'green';
    ctx.stroke();
}

