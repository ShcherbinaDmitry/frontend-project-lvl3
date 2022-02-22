import axios from 'axios';
import parse from './parser';

export default (feed) => {
  const path = new URL('https://hexlet-allorigins.herokuapp.com/get');
  path.searchParams.set('disableCache', true);
  path.searchParams.set('url', feed.url);

  return axios.get(path).then((responce) => parse(responce.data.contents, feed));
};
