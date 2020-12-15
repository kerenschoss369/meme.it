'use strict';

function renderImages() {
    var images = getImgsForDisplay();
    var html, col1 = '', col2 = '', col3 = '', col4 = '';
    images.forEach(function (image, i) {
        //(this.src)
        if (i % 4 === 0) { col1 += `<img class="gallery-img" onclick="onChooseImg(${image.id})" src=${image.imageUrl} alt="gallery-img" />` }
        else if (i % 4 === 1) { col2 += `<img class="gallery-img" onclick="onChooseImg(${image.id})" src=${image.imageUrl} alt="gallery-img" />` }
        else if (i % 4 === 2) { col3 += `<img class="gallery-img" onclick="onChooseImg(${image.id})" src=${image.imageUrl} alt="gallery-img" />` }
        else { col4 += `<img class="gallery-img" onclick="onChooseImg(${image.id})" src=${image.imageUrl} alt="gallery-img" />` }
    });
    html = `<div class="gallery-column"> ${col1} </div>
     <div class="gallery-column"> ${col2} </div>
     <div class="gallery-column"> ${col3} </div>
     <div class="gallery-column"> ${col4} </div>`;
    document.querySelector('.gallery-container').innerHTML = html;

}

function renderKeywords() {
    var keywordsHtml = '';
    var keywords = getKeywordsForDisplay();
    for (const [key, value] of Object.entries(keywords)) {
        var fontSize = value * 5;
        if (value < 3) fontSize = 20;
        keywordsHtml += `<p class="keyword" onClick=onFilterChange('${key}') style="font-size:${fontSize}px;">${key}</p>`;
    }
    document.querySelector('.keywords-container').innerHTML = keywordsHtml;
}

function onFilterChange(key) {
    filterChange(key);
    renderImages();
}