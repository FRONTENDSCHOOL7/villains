import { useState } from 'react';
import client from '../config/api.config';

const getProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async (id) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('user')).token;

    try {
      const response = await client.get(`/product/detail/${id}`, {}, client.BothType(token));
      return response.data.product;
    } catch (error) {
      setError(error);
      return;
    }
    setLoading(false);
  };

  return { fetchProduct, loading, error };
};

export default getProductDetail;
