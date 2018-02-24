import {isNil} from "ramda";

let ctx;

export const drawLine = (sourceLoc = {x: 0, y: 0}, targetLoc = {x: 0, y: 0}) => {

    let containerOffsetTop = ctx.canvas.offsetParent.offsetTop;
    let containerOffsetLeft = ctx.canvas.offsetParent.offsetLeft;

    ctx.beginPath();
    ctx.moveTo(sourceLoc.x - containerOffsetLeft, sourceLoc.y - containerOffsetTop);
    ctx.lineTo(targetLoc.x - containerOffsetLeft, targetLoc.y - containerOffsetTop);
    ctx.strokeStyle = 'green';
    ctx.stroke();
}

export const drawLineToCursor = (mouseEvent, sourceElement) => {
    let sourceRect = sourceElement.getBoundingClientRect();
    let targetX = mouseEvent.x;
    let targetY = mouseEvent.y;
    let sourceXCenter = sourceRect.right - (sourceRect.width / 2)
    let sourceYCenter = sourceRect.top + (sourceRect.height / 2)

    if (isNil(ctx)) {
        ctx = document.getElementById('canvas').getContext("2d");
    }

    clearLine();
    drawLine({x: sourceXCenter, y: sourceYCenter}, {x: targetX, y: targetY})
}

export const clearLine = () => {
    ctx.clearRect(
        0,
        0,
        ctx.canvas.clientWidth,
        ctx.canvas.clientHeight
    );
}