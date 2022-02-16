import axios from 'axios';

export default (feed) => {
  axios.get(feed)
    .then((responce) => {
      console.log(responce);
      const parser = new DOMParser();
      const postData = parser.parseFromString(responce.data, 'text/xml');
      console.log(postData);
    }).catch((err) => {
      console.log(err);
      throw new Error('Can\'t read URL!');
    });
};
