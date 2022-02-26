import axios from 'axios';
import parse from './parser.js';

export default (feed) => {
  const path = new URL('https://hexlet-allorigins.herokuapp.com/get?disableCache=true');
  path.searchParams.set('disableCache', true);
  path.searchParams.set('url', feed.url);
  console.log('Logging path obj');
  console.log(path);
  console.log(path.url);

  return axios.get(path.href).then((responce) => parse(responce.data.contents, feed));
};
