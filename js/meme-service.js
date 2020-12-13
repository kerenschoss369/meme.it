'use strict';

// var gMeme = {
//  selectedImgId: 5,
//  gMeme.selectedLineIdx
//  lines: [
//  {
//  txt: 'I never eat Falafel',
//  size: 20,
//  align: 'left',
//  color: 'red'
//  }
//  ]
// }

var gUrl;
var gMeme;
var gElCanvas;
var gElCtx;

function getElCanvas(elCanvas) {
    gElCanvas = elCanvas;
}

function getElCtx(elCtx) {
    gElCtx = elCtx;
}

function setMemeOnCanvas(id) {
    gMeme = createMeme(id);
    var img = new Image();
    var imageUrl=getImageUrlById(gMeme.selectedImgId);
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
        fontFamily: 'ImpactFont',
        strokeColor: 'black',
        textAlign: 'center',
        x,
        y,
    }
}

function createMeme(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        // url,
        lines: [createLine('first'), createLine('second')],
    }
    return meme;
}

function resizeCanvas(img) {
    // var maxheight = 400;
    var width = img.width;
    var height = img.height;
    // if (height > maxheight) {
    // var width = width * maxheight / height;
    // height = maxheight;
    // }
    // gCanvas = document.querySelector('.canvas');
    gElCanvas.width = width;
    gElCanvas.height = height;
}


function setTxtLocation() {
    gMeme.lines.forEach(function (line, i) {
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
    img.onload = function () {
        gElCtx.drawImage(img, 0, 0);
        drawTxt(isSelectedMarked);
    }
}

function drawTxt(isSelectedMarked = true) {
    gElCtx.textAlign = 'center';
    gMeme.lines.forEach(line => {
        // set the setting that the line has and draw it on the canvas
        gElCtx.textAlign = line.textAlign;
        gElCtx.font = `${line.fontSize}px ${line.fontFamily}`;
        gElCtx.lineJoin = "round";
        // mark the selected line
        if (isSelectedMarked && line.id === gMeme.lines[gMeme.selectedLineIdx
        ].id) {
            gElCtx.lineWidth = 11;
            gElCtx.strokeStyle = 'yellow';
            gElCtx.strokeText(line.txt, line.x, line.y);
        }
        gElCtx.strokeStyle = line.strokeColor;
        gElCtx.lineWidth = 8;
        gElCtx.strokeText(line.txt, line.x, line.y);
        gElCtx.fillStyle = line.txtColor;
        gElCtx.fillText(line.txt, line.x, line.y);
    });
}

function moveLine(num) {
    // move up for 1 and down for -1
    if (num === 1) {
        if (gMeme.lines[gMeme.selectedLineIdx
        ].y <= 30) return;
        gMeme.lines[gMeme.selectedLineIdx
        ].y -= 20;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx
        ].y >= gElCanvas.height - 30) return;
        gMeme.lines[gMeme.selectedLineIdx
        ].y += 20;
    }
}

function switchSelectedLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx++;
    }
}

function addLine() {
    var newLine = createLine();
    gMeme.lines.push(newLine);
    gMeme.lines[gMeme.selectedLineIdx] = newLine;
}

function removeLine() {
    var fixedLines = gMeme.lines.filter(line => line.id !== gMeme.lines[gMeme.selectedLineIdx
    ].id);
    switchSelectedLine();
    gMeme.lines = fixedLines;
}

function changeFontSize(num) {
    //if num is 1 make the font larger
    if (num === 1) {
        if (gMeme.lines[gMeme.selectedLineIdx].fontSize>=60) return;
        gMeme.lines[gMeme.selectedLineIdx].fontSize += 3;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx].fontSize<=12) return;
        gMeme.lines[gMeme.selectedLineIdx].fontSize -= 3;
    }
}

function changeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeAlign(side) {
    var width = gElCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width;
    if (side === 'left') {
        if (gMeme.lines[gMeme.selectedLineIdx].x <= 30) return;
        gMeme.lines[gMeme.selectedLineIdx].x = 50 + width / 2;
    } else if (side === 'center') {
        gMeme.lines[gMeme.selectedLineIdx].x = gElCanvas.width / 2;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx].x >= gElCanvas.height - 30) return;
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

function getPlaceholderValue() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}