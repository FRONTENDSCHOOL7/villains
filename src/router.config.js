import axios from 'axios';

const BASE_URL = 'https://api.mandarin.weniv.co.kr/';
export const GET_SPLASH_API = `${BASE_URL}`;

const get = async url => {
  return await axios.get(`${url}`);
};
