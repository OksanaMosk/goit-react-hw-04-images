import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40251499-e33a4520fef95d2a86c463901';

async function fetchPhoto(searchPhoto, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchPhoto,
    page: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const response = await axios(`${BASE_URL}?${searchParams}`);

  if (response.status === 404) {
    Notiflix.Notify.failure('Oooops...Some error occured...');
    return Promise.reject();
  }
  return response;
}

export default fetchPhoto;
