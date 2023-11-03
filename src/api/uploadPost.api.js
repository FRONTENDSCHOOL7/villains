import client from '../config/api.config';

const uploadPost = async (postData) => {
  
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
