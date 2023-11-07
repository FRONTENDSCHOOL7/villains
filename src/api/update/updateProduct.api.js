import client from '../../config/api.config';

const updateProduct = async (itemName, price, link, Img, id) => {
  const productData = {
    product: {
      itemName: itemName,
      price: price,
      link: link,
      itemImage: Img,
    },
  };
  const token = JSON.parse(localStorage.getItem('admin')).token;
  const headers = client.BothType(token);
  try {
    const response = await client.put(`/product/${id}`, productData, { ...headers });
    if (response.data) {
      return response.data.product;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default updateProduct;
