import axios from 'axios';
import parse from './parser.js';

export default (feed) => {
  const path = new URL('https://hexlet-allorigins.herokuapp.com/get');
  path.searchParams.set('disableCache', true);
  path.searchParams.set('url', feed.url);

  return axios.get(path.toString()).then((responce) => parse(responce.data.contents, feed));
};
