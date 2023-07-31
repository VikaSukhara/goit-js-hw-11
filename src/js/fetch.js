import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchLink(searchedWord, page = +1) {
  const options = {
    key: '38550354-eee994e31f66bb4c1e0427d2f',
    q: searchedWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: '40',
  };

  const params = new URLSearchParams(options);

  const { data } = await axios.get(`${BASE_URL}?${params.toString()}`); //   response.data = {data}
  return data;

  //   return fetch(`${BASE_URL}?${params.toString()}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json()
}
