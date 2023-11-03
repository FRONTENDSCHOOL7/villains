import client from '../config/api.config';

const putPostEdit = async (id, postData, token) => {
  console.log(id);

  try {
    const response = await client.put(`/post/${id}`, postData, client.BothType(token));

    if (response.data) {
      return response.data.post;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default putPostEdit;
