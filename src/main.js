import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getData } from "./js/pixabay-api.js";

const ourForm = document.querySelector(".form");
const buttonSearch = document.querySelector(".button-search");
const loader = document.querySelector(".loader");
const buttonLoadMore = document.querySelector(".button-load-more");
const galleryImg = document.querySelector(".gallery");

const query = "";
const page = 1;
let current_page;
let current_query;

// підслуховувач на відправку
ourForm.addEventListener("submit", getPhoto);

// функція яка виконується в підслуховувачі
function getPhoto(event) {
    // забороняємо браузеру виконувати стандартні сценарії
    event.preventDefault();
    // зчитуємо які дані ввели в поле інпут
    const query = event.target.elements.search.value.trim();

    // перевірка на порожнє поле
    if (!query) {
        iziToast.warning({
                title: "Look at me",
                message: `Ви не ввели що треба шукати`,
                messageColor: 'black',
                messageSize: '16',
                backgroundColor: 'orange',
                theme: 'dark',
                position: 'topRight',
        });
        return;
    } 

    buttonSearch.disabled = false;
    getData(query, page);

    current_query = query;
    current_page = page;
    buttonLoadMore.classList.remove('is-hidden');
};

buttonLoadMore.addEventListener('click', loadMorePictures);

function loadMorePictures() {
    loader.classList.remove('is-hidden');
    current_page++;
    getData(current_query, current_page);
    loader.scrollIntoView();
    loader.classList.add("is-hidden");

}

export { ourForm, query, page, galleryImg};