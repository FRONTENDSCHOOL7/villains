import client from '../config/api.config';

const uploadPost = async (content, urls, location) => {
  const postData = {
    post: {
      content: JSON.stringify({
        postId: 'villains',
        contents: content,
        location: {
          latitude: location ? location.latitude : 33,
          longitude: location ? location.longitude : 130,
        },
      }),
      image: urls,
    },
  };

  const token = JSON.parse(localStorage.getItem('user')).token;
  const headers = client.BothType(token);

  try {
    const response = await client.post('/post', postData, { ...headers });

    if (response.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default uploadPost;
