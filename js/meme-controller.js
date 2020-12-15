'use strict';

function onInit() {
    sendElCanvas();
    sendElCtx();
    renderImages();
    renderKeywords();
    dragAndDrop();
    touchEvent();
}

function onChangeSelected(ev) {
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;

    var selectedLine = findClickedLine(offsetX, offsetY)
    if (!selectedLine) return;
    gIsTxt = true;

    const lines = getLines();
    var selectedLineIdx = lines.findIndex(line => {
        return line.id === selectedLine.id;
    })

    let meme = getMeme();

    meme.selectedLineIdx = selectedLineIdx;
    drawImgAndTxt(meme.selectedImgId);
    setTxtLineValue();
}


function mouseEvents() {
    var elCanvas = document.querySelector('.canvas');
    var currentX = getLineX();
    currentX = currentX / 2;
    var currentY = getLineY();

    elCanvas.onmousedown = function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        var lineWidth = getLineWidth();
        var lineHeight = getLineHeight();

        if (mouseX >= (currentX - (lineWidth)) &&
            mouseX <= (currentX + (lineWidth)) &&
            mouseY <= (currentY + (lineHeight))) {
            setLineDraggble(true);
        }
    };
    elCanvas.onmousemove = function(e) {
        var lineWidth = getLineWidth();
        var lineHeight = getLineHeight();

        if (isLineDraggable()) {
            currentX = e.offsetX + (lineWidth / 2);
            currentY = e.offsetY + lineHeight * 2;
            setLineX(currentX);
            setLineY(currentY);
        }
    };
    elCanvas.onmouseup = function(e) {
        setLineDraggble(false);

    };
    elCanvas.onmouseout = function(e) {
        setLineDraggble(false);
    };
}

function onClickMenuBtn() {
    const elMenu = document.querySelector('.navbar-container');
    elMenu.classList.toggle('menu-open');
}

function sendElCanvas() {
    var elCanvas = document.querySelector('.canvas');
    getElCanvas(elCanvas);
}

function sendElCtx() {
    var elCanvas = document.querySelector('.canvas');
    var elCtx = elCanvas.getContext('2d');
    getElCtx(elCtx);
}

function sendElImageId(id) {
    setMemeOnCanvas(id);
}

function onClickGallery() {
    resetFilter();
    renderImages();
    // document.querySelector('body').style.backgroundColor = '#cfcfcf';
    var elGallery = document.querySelector('.main-gallery');
    var elEditor = document.querySelector('.meme-editor-container');
    if (elGallery.classList.contains('d-none')) {
        elGallery.classList.remove('d-none');
        elEditor.classList.remove('flex');
        elEditor.classList.add('d-none');
    }
}

function onChooseImg(id) {
    // document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('.main-gallery').classList.add('d-none');
    document.querySelector('.meme-editor-container').classList.remove('d-none');
    document.querySelector('.meme-editor-container').classList.add('flex');
    sendElImageId(id);
    setTxtLineValue();
}

function onMoveLine(num) {
    moveLine(num);
    drawImgAndTxt();
}

function onChangeAlign(side) {
    changeAlign(side);
    drawImgAndTxt();
}

function onSwitchSelectedLine() {
    switchSelectedLine();
    drawImgAndTxt();
    setTxtLineValue();
    var value = getLineTxt();
    document.querySelector('.txt-line').value = value;
}

function onAddLine() {
    addLine();
    drawImgAndTxt();
    document.querySelector('.txt-line').value = 'Text Here';
}

function onRemoveLine() {
    removeLine();
    drawImgAndTxt();
}

function onChangeFontSize(num) {
    changeFontSize(num);
    drawImgAndTxt();
}

function onChangeText() {
    var elTxt = document.querySelector('.txt-line').value;
    changeText(elTxt);
    drawImgAndTxt();
}

function setTxtLineValue() {
    var value = getLineTxt();
    document.querySelector('.txt-line').value = value;
}

function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    drawImgAndTxt();
}

function onChangeTextColor(color) {
    changeTextColor(color);
    drawImgAndTxt();
}

function onChangeFontFamily(font) {
    changeFontFamily(font);
    drawImgAndTxt();
}

function onDrawForDownLoad() {
    drawImgAndTxt(false);
}

function onDrawAfterDownload() {
    drawImgAndTxt();
}

function onDownloadImg(elLink) {
    var elCanvas = document.querySelector('.canvas');
    var imgContent = elCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-btn').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}