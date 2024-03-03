import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

// імпортуємо функцію createMarkup з файла render-functions.js
import { galleryImg, createMarkup } from "./render-functions.js";
import { ourForm} from "../main.js";

axios.defaults.baseURL = "https://pixabay.com/api/";
const paramPixabay = {
    key: "42515741-a33332df4257bc0cfcc74fb38",
    image_type : "photo",
    orientation : "horizontal",
    safesearch: true,
    per_page: 3,
}

export async function getData(query, page) {
    try {
        console.log(`${query} + ${page}`);
      await axios.get(`?key=${paramPixabay.key}&q=${query}&image_type=${paramPixabay.image_type}&orientation=${paramPixabay.orientation}&safesearch=${paramPixabay.safesearch}&per_page=${paramPixabay.per_page}&page=${page}`)
        .then( resp => {
               if (!resp.statusText === "Ok") {
                throw new Error(resp.status);
               } else if (resp.data.hits.length === 0) {
                    galleryImg.innerHTML = "";
                    iziToast.error({
                    title: 'Error',
                    message: `Sorry, there are no images matching your search query. Please try again!`,
                    messageColor: 'white',
                    messageSize: '16',
                    backgroundColor: 'red',
                    theme: 'dark',
                    position: 'topRight',
                    });
                   return;
               } else {
                   createMarkup(resp.data);
                      }
          })
        .catch(error => {
                // ловимо помилки
                return iziToast.error({
                title: 'Error',
                message: `${error}`,
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'red',
                theme: 'dark',
                position: 'topRight',
                });
            })
        .finally(() => {
        // в будь-якому варіанті обнуляємо поле інпут від старого запиту
            ourForm.reset();
            });
    //   console.log(response);
      
  } catch (error) {
    console.error(error);
  }
}