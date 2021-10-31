import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import LoadMoreBtn from './loadMoreBtn'

export const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
})

const API_KEY = '24009911-9ac198a76ee72dc693090197c'
const BASE_URL =   `https://pixabay.com/api/`

export default class ImgApiService{
    constructor() {
        this.searchQuery = ''
        this.page = 1
    }

   async fetchImages() {
        const params = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
       const URL = BASE_URL + params

       try {
        const result = await fetch(URL)
           const { hits } = await result.json()
            this.incrementPage();
                if (hits.length === 0) {
                    error({
                        title: 'Sorry',
                        text: 'Not Found',
                        delay: 1000,
                    })
                    loadMoreBtn.hide()
                    return []
                }
            return hits;
       } catch (error) {
           console.log(error); 
       }
       
        // return fetch(URL)
        //     .then(response => response.json())
        //     .then(({ hits }) => {
        //         this.page += 1;
        //         if (hits.length === 0) {
        //             error({
        //                 title: 'Sorry',
        //                 text: 'Not Found',
        //                 delay: 1000,
        //             })
        //             loadMoreBtn.hide()
        //             return []
        //         }
        //         return hits;
        //     })
    }

     incrementPage() {
    this.page += 1;
  }

    resetPages() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}