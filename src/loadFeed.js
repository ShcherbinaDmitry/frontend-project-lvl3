import axios from 'axios';
import parse from './parser.js';

const proxify = (link) => {
  const url = new URL('https://hexlet-allorigins.herokuapp.com/get');
  url.searchParams.set('url', link);
  url.searchParams.set('disableCache', 'true');

  return url;
};

export default (feed) => {
  const path = proxify(feed.url).href;
  console.log('Logging path obj');
  console.log(path);
  // console.log(path.searchParams.get('url'));

  return axios.get(path).then((responce) => parse(responce.data.contents, feed));
};
