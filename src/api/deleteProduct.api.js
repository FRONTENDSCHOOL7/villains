import client from '../config/api.config';

const deleteProduct = async (id) => {
  const token = JSON.parse(localStorage.getItem('admin')).token;
  const headers = client.BothType(token);

  try {
    const response = await client.delete(`/product/${id}`, {}, { ...headers });
    if (response.data) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default deleteProduct;
