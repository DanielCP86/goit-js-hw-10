import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_3Wn20ZFVSrJeDUPB8XKkWx2m4O8wdm3JV7CI2hHH7fynlKM9kQv2uZskJNqcHsc9';

const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';

function fetchBreeds() {
  return axios.get(ENDPOINT);
}

export default { fetchBreeds };
