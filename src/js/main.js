import imagesTpl from '../templates/photo-card.hbs'
import refs from './refs'
import ImgApiService from './apiService'
import { loadMoreBtn } from './apiService'

import * as basicLightbox from 'basiclightbox'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, notice } from '@pnotify/core';

const { searchForm, imagesContainer } = refs
const imgApiService = new ImgApiService();


searchForm.addEventListener('submit', onSearch)
loadMoreBtn.refs.button.addEventListener('click', onLoadMore)
imagesContainer.addEventListener('click', onGalleryOfImagesClick)


function onSearch(e) {
    e.preventDefault();
    
    imgApiService.query = e.currentTarget.elements.query.value

    if (imgApiService.query === '') {
        return  notice({
            text: 'Please, enter the word',
            delay: 1500
        });
    }

    loadMoreBtn.show()
    imgApiService.resetPages()
    clearImagesContainer()
    fetchImgs()
}

function onLoadMore() {
    fetchImgs()
    setTimeout(handleButtonClick, 500)
}


function fetchImgs() {
    loadMoreBtn.disable();
    imgApiService.fetchImages().then(hits => {
        appendImgMarkup(hits);
        loadMoreBtn.enable();
    })
}

function appendImgMarkup(hits) {
    imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(hits))
}

function clearImagesContainer() {
    imagesContainer.innerHTML = ''
}

function handleButtonClick() {
//    console.log( imagesContainer.children.length); 
    imagesContainer.children[imagesContainer.children.length - 9].scrollIntoView({
        block: 'end', behavior: 'smooth',
    })
    
}


function onGalleryOfImagesClick(e) {
    e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
    const bigImgURL = e.target.getAttribute('data-src')
    const instance = basicLightbox.create(`<img width="1400" height="900" src= ${bigImgURL}>`)
    instance.show()
}