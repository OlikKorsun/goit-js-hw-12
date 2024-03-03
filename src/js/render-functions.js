// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export { galleryImg, htmlListOfGallery, createMarkup };
import { galleryImg } from "../main.js";

let htmlListOfGallery = "";

// експортуємо створену функцію createMarkup щоб можна було її вставити в pixabay.js
function createMarkup(data) {
  console.log(data.hits.length);
  // обнуляємо розмітку сторінки якщо там є якісь попередні дані
  galleryImg.innerHTML = null;
  // відмальовка розмітки з картинками, 
  // де data - сам об'єкт, 
  // hits - масив у ньому який містить потрібні дані
  // largeImageUrl, tags, likes - потрібні дані
  data.hits.forEach(hit => {
    htmlListOfGallery += `<li class="gallery-item">
         <a class="gallery-link" href="${hit.largeImageURL}">
         <img class="gallery-image"
                src="${hit.webformatURL}"
                alt="${hit.tags}"/> </a>
        <ul class="stat">
          <li class="detals-stat">
           <h2 class="description">Likes</h2>
           <p class="stat-value">${hit.likes}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Views</h2>
           <p class="stat-value">${hit.views}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Comments</h2>
           <p class="stat-value">${hit.comments}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Downloads</h2>
           <p class="stat-value">${hit.downloads}</p>
          </li>
        </ul>
        </li>`
  });

  // відмальовуємо за раз все що сформували
  galleryImg.insertAdjacentHTML("beforeend", htmlListOfGallery);
  console.log(htmlListOfGallery);
  
  lightbox.refresh();
  
}

// відкривашка великих красивих картинок
  const lightbox = new SimpleLightbox('.gallery-item a', {
            captionsData: "alt",
            captionPosition: "bottom",
            captionDelay: 250,
  });

