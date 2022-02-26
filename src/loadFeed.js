import axios from 'axios';
import parse from './parser.js';

const proxify = (url) => {
  const link = 'https://hexlet-allorigins.herokuapp.com/get';

  return `${link}?disableCache=true&url=${url}`;
};

export default (feed) => {
  const path = proxify(feed.url);
  console.log('Logging path obj');
  console.log(path);
  // console.log(path.searchParams.get('url'));

  return axios.get(path).then((responce) => parse(responce.data.contents, feed));
};
