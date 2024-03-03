import axios from "axios";

// заносимо базовий URL в axios
axios.defaults.baseURL = "https://pixabay.com/api/";
// параметри для пошуку картинок
const paramPixabay = {
    key: "42515741-a33332df4257bc0cfcc74fb38",
    image_type : "photo",
    orientation : "horizontal",
    safesearch: true,
    per_page: 15,
}

// функція яка витягує колекцію картинок за запитом
export async function getData(query, page) {
    try {
        const resp = await axios.get(`?key=${paramPixabay.key}&q=${query}&image_type=${paramPixabay.image_type}&orientation=${paramPixabay.orientation}&safesearch=${paramPixabay.safesearch}&per_page=${paramPixabay.per_page}&page=${page}`);
        return resp;
        } catch (error) {
        console.error(error);
  }
}