import axios from 'axios';
import parse from './parser.js';

export default (url) => {
  const path = new URL('https://hexlet-allorigins.herokuapp.com/get?disableCache=true');
  path.searchParams.set('disableCache', true);
  path.searchParams.set('url', url);
  console.log('Logging path obj');
  console.log(path);
  console.log(path.searchParams.get('url'));

  return axios.get(path).then((responce) => parse(responce.data.contents, url));
};
