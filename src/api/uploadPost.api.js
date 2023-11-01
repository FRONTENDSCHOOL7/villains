import client from '../config/api.config';

const uploadPost = async (content, urls, location) => {
  const postData = {
    post: {
      content: JSON.stringify({
        postId: 'villains',
        contents: content,
        latitude: location ? location.latitude : 0,
        longitude: location ? location.longitude : 0,
      }),
      image: urls,
    },
  };

  const token = JSON.parse(localStorage.getItem('user')).token;
  const headers = client.BothType(token);

  try {
    const response = await client.post('/post', postData, { ...headers });

    if (response.data) {
      return response.data.post;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default uploadPost;
