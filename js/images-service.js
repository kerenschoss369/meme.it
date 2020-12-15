'use strict';

var gImgs = createImgs();
var gKeywords = createKeywords();
var gFilterBy = 'all';

function createImgs() {
    return [
        createImg('meme-imgs/2.jpg', ['happy']),
        createImg('meme-imgs/003.jpg'),
        createImg('meme-imgs/004.jpg', ['dog', 'happy']),
        createImg('meme-imgs/005.jpg', ['dog', 'baby', 'happy']),
        createImg('meme-imgs/5.jpg', ['happy', 'baby']),
        createImg('meme-imgs/006.jpg', ['cat']),
        createImg('meme-imgs/8.jpg', ['celebrity']),
        createImg('meme-imgs/9.jpg', ['happy']),
        createImg('meme-imgs/12.jpg', ['celebrity']),
        createImg('meme-imgs/19.jpg',),
        createImg('meme-imgs/Ancient-Aliens.jpg', ['celebrity']),
        createImg('meme-imgs/img2.jpg', ['happy', 'baby']),
        createImg('meme-imgs/img5.jpg', ['baby']),
        createImg('meme-imgs/img6.jpg', ['dog']),
        createImg('meme-imgs/img11.jpg', ['happy', 'celebrity']),
        createImg('meme-imgs/img12.jpg', ['kiss', 'celebrity']),
        createImg('meme-imgs/leo.jpg', ['happy', 'celebrity']),
        createImg('meme-imgs/meme1.jpg'),
        createImg('meme-imgs/putin.jpg', ['celebrity']),
        createImg('meme-imgs/One-Does-Not-Simply.jpg', ['celebrity']),
        createImg('meme-imgs/Oprah-You-Get-A.jpg', ['happy', 'celebrity']),
        createImg('meme-imgs/patrick.jpg', ['happy', 'celebrity']),
        createImg('meme-imgs/X-Everywhere.jpg'),
    ];
}


function resetFilter() {
    gFilterBy = 'all';
}

function createKeywords() {
    var keywords = {};
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (keyword in keywords) {
                keywords[keyword]++;
            } else {
                keywords[keyword] = 1;
            }
        });
    });
    return keywords;
}

function createImg(imageUrl, keywords = []) {
    return {
        id: makeId(),
        imageUrl,
        keywords,
    }
}

function getImgsForDisplay() {
    var keys = Object.keys(gKeywords);
    if (gFilterBy === "all") {
        return gImgs;
    }

    var images = gImgs.filter((img) =>
        (img.keywords.includes(gFilterBy))
    );

    return images;
}

function getKeywordsForDisplay() {
    return gKeywords;
}

function getImgs() {
    return gImgs;
}

function getImageUrlById(id) {
    var imageUrl = null;
    gImgs.forEach(img => {
        if (img.id === id.toString()) {
            imageUrl = img.imageUrl;
        }
    });
    return imageUrl;
}

function filterChange(filterBy) {
    gFilterBy = filterBy;
}

