import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// імпорти функцій і елементів з інших js-файлів
import { getData } from "./js/pixabay-api.js";
import { createMarkup, galleryImg } from "./js/render-functions.js";

const ourForm = document.querySelector(".form");
const buttonSearch = document.querySelector(".button-search");
const loader = document.querySelector(".loader");
const buttonLoadMore = document.querySelector(".button-load-more");

const query = "";
const page = 1;
const perPage = 15;
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
    // перевірка чи введено новий запит в форму пошуку, якщо так то сторінка обнуляється і виводяться нові картинки
    else if (query !== current_query) {
        galleryImg.innerHTML = "";
    }
    // якщо введено такий самий запит як і попередній - виходить відповідне повідомлення
    else {
        iziToast.warning({
                title: "Look at me",
                message: `Ви зробили запит як і попередній, використовуйте кнопку "Load more" щоб завантажити більше ${current_query}`,
                messageColor: 'black',
                messageSize: '16',
                backgroundColor: 'pink',
                theme: 'dark',
                position: 'topRight',
        });
        return;
    };

    buttonSearch.disabled = false;
    // викликаємо функцію запиту картинок і заносимо її в змінну-проміс
    const resp = getData(query, page);
    resp
        .then(resp => {
            // якщо проміс повернув помилку про стан http
            if (!resp.statusText === "Ok") {
                throw new Error(resp.status);
            }
            // перевірка чи знайдено щось було за нашим запитом, хоча б один запис, якщо ні 
            // - сторінка обнуляється + повідомлення
            else if (resp.data.hits.length === 0) {
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
                    buttonLoadMore.style.display = "none";
                   return;
            }
            // якщо все добре і щось знайшлось, викликаємо функцію відмальовки карток з картинками
            else {
                createMarkup(resp.data.hits);
                // перевірка чи знайшло менше-дорівнює картинок ніж нам потрібно (15 штук)
                if (resp.data.totalHits <= perPage) {
                    // кнопка Load more не з'являється
                    buttonLoadMore.style.display = "none";
                    // повідомлення - що це всі картинки що були знайдені
                    iziToast.warning({
                    title: 'Ups',
                    message: `We're sorry, but you've reached the end of search results`,
                    messageColor: 'black',
                    messageSize: '16',
                    backgroundColor: 'lightblue',
                    theme: 'dark',
                    position: 'bottomRight',
                    });
                } else {
                    // якщо знайшло більше ніж 15 - кнопка Load more активується
                    buttonLoadMore.style.display = "block";
                }
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
        .finally(() =>{
            // в будь-якому варіанті обнуляємо поле інпут від старого запиту
            ourForm.reset();
        });
// запам'ятовуємо поточний запит і що стартонули зі сторінки 1
    current_query = query;
    current_page = page;
// робимо кнопку Load more безкласною
    buttonLoadMore.classList.remove('is-hidden');
};

// вішаємо слухача на натискання кнопки Load more
buttonLoadMore.addEventListener('click', loadMorePictures);

// функція яка буде виконуватись при натисканні на кнопку Load more
function loadMorePictures() {
    // знімаємо з крутелика клас is-hidden і робимо видими
    loader.classList.remove('is-hidden');  
    loader.style.display = 'block';
    // збільшуємо лічильник поточних сторінок
    current_page++;
    // отримуємо продовження масиву даних з АПІ
    const resp = getData(current_query, current_page);
    resp
        .then(resp => {
            // вираховуємо загальну кількість сторінок зі знайденими картинками
            // округлюємо до цілого числа в більшу сторону
            // загальну кількість знайдених картинок / облікові 15 на сторінку
            const totalPage = Math.ceil(resp.data.totalHits / perPage);
            // вираховуємо висоту рядка з картинками
            const heightOfImg = galleryImg.firstElementChild.getBoundingClientRect().height;
            // область видимості вікна прокручується на 2 висоти картинки згідно умови ТЗ
            window.scrollBy({ top: heightOfImg * 2, behavior: 'smooth' });
            // перевірка чи не дібрались ми до кінця колекції картинок
            if (current_page < totalPage) {
                createMarkup(resp.data.hits);
            }
            // якщо таки дійшли до кінця - виводимо залишок картинок, ховаємо кнопку Load more і виводимо попередження
            else {
                createMarkup(resp.data.hits);
                buttonLoadMore.style.display = "none";
                iziToast.warning({
                title: 'Ups',
                message: `We're sorry, but you've reached the end of search results`,
                messageColor: 'black',
                messageSize: '16',
                backgroundColor: 'lightgreen',
                theme: 'dark',
                position: 'bottomRight',
                });
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
            });
    //  повинні прокручувати сторінку поки не побачимо кнопку внизу
    buttonLoadMore.scrollIntoView({ block: "end" });
    // ховаємо крутелика на кнопці
    loader.style.display = 'none';
    loader.classList.add("is-hidden");
}