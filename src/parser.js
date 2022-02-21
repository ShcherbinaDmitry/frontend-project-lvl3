import axios from 'axios';
import { uniqueId } from 'lodash';

export default (feedObj) => {
  const originPath = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(feedObj.url)}`;

  return axios.get(originPath).then((responce) => {
    const parser = new DOMParser();
    const postData = parser.parseFromString(responce.data.contents, 'text/xml');
    return postData;
  }).then((data) => {
    const feed = {
      ...feedObj,
      title: data.querySelector('title').textContent,
      description: data.querySelector('description').textContent,
    };

    const items = data.querySelectorAll('item');
    const posts = [];

    items.forEach((item) => {
      const post = {
        id: uniqueId(),
        feedId: feed.id,
        watched: false,
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
        pubDate: new Date(item.querySelector('pubDate').textContent),
      };
      posts.push(post);
    });

    return { feed, posts };
  });
};
