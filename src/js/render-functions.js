import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const galleryImg = document.querySelector(".gallery");

// функція відмальовки розмітки списку картинок
export function createMarkup(images) {
  const htmlListOfGallery = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
         <a class="gallery-link" href="${largeImageURL}">
         <img class="gallery-image"
                src="${webformatURL}"
                alt="${tags}"/> </a>
        <ul class="stat">
          <li class="detals-stat">
           <h2 class="description">Likes</h2>
           <p class="stat-value">${likes}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Views</h2>
           <p class="stat-value">${views}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Comments</h2>
           <p class="stat-value">${comments}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Downloads</h2>
           <p class="stat-value">${downloads}</p>
          </li>
        </ul>
        </li>`
    ).join('');
  
  // відмальовуємо за раз все що сформували
  galleryImg.insertAdjacentHTML("beforeend", htmlListOfGallery);
    
  lightbox.refresh();
}
  
// відкривашка великих красивих картинок
  const lightbox = new SimpleLightbox('.gallery-item a', {
            captionsData: "alt",
            captionPosition: "bottom",
            captionDelay: 250,
  });