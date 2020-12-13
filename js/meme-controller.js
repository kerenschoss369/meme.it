'use strict';

function onInit() {
    sendElCanvas();
    sendElCtx();
    renderImages();
    renderKeywords();
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
    document.querySelector('body').style.backgroundColor = '#cfcfcf';
    var elGallery = document.querySelector('.main-gallery');
    var elEditor = document.querySelector('.meme-editor-container');
    if (elGallery.classList.contains('d-none')) {
        elGallery.classList.remove('d-none');
        elEditor.classList.remove('flex');
        elEditor.classList.add('d-none');
    }
}

// function onUploadImg(ev) {
//     var imgSrc = URL.createObjectURL(ev.target.files[0]);
//     // console.log(imgSrc);
//     createImg(imgSrc);
//     onChooseImg(imgSrc);
// }

function onChooseImg(id) {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('.main-gallery').classList.add('d-none');
    document.querySelector('.meme-editor-container').classList.remove('d-none');
    document.querySelector('.meme-editor-container').classList.add('flex');
    sendElImageId(id);
    changeTxtLinePlacehoder();
    document.querySelector('.txt-line').value = null;
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
    changeTxtLinePlacehoder();
    var placeholderVal = getPlaceholderValue();
    document.querySelector('.txt-line').value = placeholderVal;
}

function onAddLine() {
    addLine();
    drawImgAndTxt();
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
    // var x = document.getElementById("myInput").value;
    var elTxt = document.querySelector('.txt-line').value;
    changeText(elTxt);
    drawImgAndTxt();
}

function changeTxtLinePlacehoder() {
    var placeholderVal = getPlaceholderValue();
    document.querySelector('.txt-line').placeholder = placeholderVal;
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

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}