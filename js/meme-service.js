'use strict';

var gUrl;
var gMeme;
var gElCanvas;
var gCtx;
var gIsmovingTxt = false;
var gIsTxt = true;

function findClickedLine(x, y) {
    console.log('x', x);
    console.log('y', y);
    console.log('width', getLineWidth(gMeme.lines[1]));
    console.log('heigth', getLineHeight(gMeme.lines[0]));
    console.log('line x:', gMeme.lines[1].x);
    console.log('line y:', gMeme.lines[1].y);
    console.log(`canvas width ${gElCanvas.width}`);
    console.log(`canvas height ${gElCanvas.height}`);
    console.log(`y < gElCanvas.height - (gElCanvas.height - line.y)`);
    console.log(`y > gElCanvas.height - (gElCanvas.height - line.y) + (getLineHeight(line));`);
    console.log(`x < line.x + (getLineWidth(line) / 2)`);
    console.log(`x > line.x - (getLineWidth(line) / 2)`);
    const line = gMeme.lines.find((line) => {
        return x < line.x + (getLineWidth(line) / 2) &&
            x > line.x - (getLineWidth(line) / 2) &&
            y > gElCanvas.height - (gElCanvas.height - line.y) - 20 &&
            y < gElCanvas.height - (gElCanvas.height - line.y) + (getLineHeight(line)) + 20;
    });
    return line;
}

function dragAndDrop() {
    gElCanvas.addEventListener('mousedown', ev => {
        if (gIsTxt) gIsmovingTxt = true
    })

    gElCanvas.addEventListener('mousemove', ev => {
        if (!gIsmovingTxt) return;
        var currLine = gMeme.lines[gMeme.selectedLineIdx]

        currLine.x = ev.offsetX;
        currLine.y = ev.offsetY;

        drawImgAndTxt()
    })

    gElCanvas.addEventListener('mouseup', ev => {
        gIsmovingTxt = false;
    })
}

function getLines() {
    return gMeme.lines;
}

function getMeme() {
    return gMeme;
}

function getElCanvas(elCanvas) {
    gElCanvas = elCanvas;
}

function getElCtx(elCtx) {
    gCtx = elCtx;
}

function setMemeOnCanvas(id) {
    gMeme = createMeme(id);
    var img = new Image();
    var imageUrl = getImageUrlById(gMeme.selectedImgId);
    img.src = imageUrl;
    resizeCanvas(img);
    setTxtLocation();
    drawImgAndTxt();
}

function createLine(kind = 'regular') {
    var txt = 'Text Here';
    var x = 0;
    var y = 0;
    if (kind === 'first') txt = 'What the heck is this meme?';
    else if (kind === 'second') txt = 'And why am I one of them?';
    else {
        x = gElCanvas.width / 2;
        y = gElCanvas.height / 2;
    }
    return {
        id: makeId(),
        txt,
        fontSize: 24,
        txtColor: 'white',
        fontFamily: 'Impact',
        strokeColor: 'black',
        textAlign: 'center',
        isDraggable: false,
        x,
        y,
    }
}

function createMeme(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [createLine('first'), createLine('second')],
    }
    return meme;
}

function resizeCanvas(img) {
    var width = img.width;
    var height = img.height;
    gElCanvas.width = width;
    gElCanvas.height = height;
}


function setTxtLocation() {
    gMeme.lines.forEach(function(line, i) {
        line.x = gElCanvas.width / 2;
        // up for the first line
        if (i === 0) {
            line.y = 70;
            // down for the second line
        } else if (i === 1) {
            line.y = gElCanvas.height - 50;
            //center for the others
        } else {
            line.y = gElCanvas.height / 2;
        }
    });
}

function drawImgAndTxt(isSelectedMarked = true) {
    //draw background
    var img = new Image();
    img.src = getImageUrlById(gMeme.selectedImgId);
    img.onload = function() {
        gCtx.drawImage(img, 0, 0);
        drawTxt(isSelectedMarked);
    }
}

function drawTxt(isSelectedMarked = true) {
    gCtx.textAlign = 'center';
    gMeme.lines.forEach(line => {
        // set the setting that the line has and draw it on the canvas
        gCtx.textAlign = line.textAlign;
        gCtx.font = `${line.fontSize}px ${line.fontFamily}`;
        gCtx.lineJoin = "round";
        // mark the selected line
        if (isSelectedMarked && line.id === gMeme.lines[gMeme.selectedLineIdx].id) {
            gCtx.lineWidth = 11;
            gCtx.strokeStyle = 'yellow';
            gCtx.strokeText(line.txt, line.x, line.y);
        }
        gCtx.strokeStyle = line.strokeColor;
        gCtx.lineWidth = 8;
        gCtx.strokeText(line.txt, line.x, line.y);
        gCtx.fillStyle = line.txtColor;
        gCtx.fillText(line.txt, line.x, line.y);
    });
}

function moveLine(num) {
    // move up for 1 and down for -1
    if (num === 1) {
        if (gMeme.lines[gMeme.selectedLineIdx].y <= 30) return;
        gMeme.lines[gMeme.selectedLineIdx].y -= 20;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx].y >= gElCanvas.height - 30) return;
        gMeme.lines[gMeme.selectedLineIdx].y += 20;
    }
}

function switchSelectedLine() {
    // if last row- move back to the first row
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    } else {
        // if regular row- move to the next row 
        if (gMeme.lines[gMeme.selectedLineIdx + 1]) {
            gMeme.selectedLineIdx++;
            // if next row is undefined- move to first row
        } else gMeme.selectedLineIdx = 0;
    }
}

function addLine() {
    var newLine = createLine();
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeLine() {
    var fixedLines = gMeme.lines.filter(line => line.id !== gMeme.lines[gMeme.selectedLineIdx].id);
    gMeme.lines = fixedLines;
    switchSelectedLine();
}

function changeFontSize(num) {
    //if num is 1 make the font larger
    if (num === 1) {
        if (gMeme.lines[gMeme.selectedLineIdx].fontSize >= 60) return;
        gMeme.lines[gMeme.selectedLineIdx].fontSize += 3;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx].fontSize <= 12) return;
        gMeme.lines[gMeme.selectedLineIdx].fontSize -= 3;
    }
}

function changeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeAlign(side) {
    var width = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width;
    if (side === 'left') {
        if (gMeme.lines[gMeme.selectedLineIdx].x <= 50) return;
        gMeme.lines[gMeme.selectedLineIdx].x = 50 + width / 2;
    } else if (side === 'center') {
        gMeme.lines[gMeme.selectedLineIdx].x = gElCanvas.width / 2;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx].x >= gElCanvas.height - 50) return;
        gMeme.lines[gMeme.selectedLineIdx].x = gElCanvas.width - (50 + width / 2);

    }
}

function changeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function changeTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].txtColor = color;
}

function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font;
}

function getLineTxt(line = gMeme.lines[gMeme.selectedLineIdx]) {
    return line.txt;
}

function setLineDraggble(isDraggable, line = gMeme.lines[gMeme.selectedLineIdx]) {
    line.isDraggable = isDraggable;
}

function isLineDraggable(line = gMeme.lines[gMeme.selectedLineIdx]) {
    return line.isDraggable;
}

function getLineX(line = gMeme.lines[gMeme.selectedLineIdx]) {
    return line.x;
}

function getLineY(line = gMeme.lines[gMeme.selectedLineIdx]) {
    return line.y;
}

function setLineX(x, line = gMeme.lines[gMeme.selectedLineIdx]) {
    line.x = x;
}

function setLineY(y, line = gMeme.lines[gMeme.selectedLineIdx]) {
    line.y = y;
}

function getLineWidth(line = gMeme.lines[gMeme.selectedLineIdx]) {
    var width = gCtx.measureText(line.txt).width;
    return width;
}

function getLineHeight(line = gMeme.lines[gMeme.selectedLineIdx]) {
    var height = gCtx.measureText(line.txt).actualBoundingBoxAscent;
    return height;
}