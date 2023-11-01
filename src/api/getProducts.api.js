import { useCallback, useEffect, useState } from 'react';
import client from '../config/api.config';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const getProducts = () => {
  const [products, setProducts] = useState([]); // 현재 로드된 게시글
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const PRODUCTS_REQUEST = 10; // 한 번의 요청에 가져오는 게시글 수

  const fetchProducts = useCallback(async () => {
    let fetchedProducts = [];
    let currentSkip = skip;
    const admin = JSON.parse(localStorage.getItem('admin')).accountname;
    const token = JSON.parse(localStorage.getItem('user')).token;
    const headers = client.BothType(token);

    try {
      const response = await client.get(
        `/product/${admin}/?limit=${PRODUCTS_REQUEST}&skip=${currentSkip}`,
        {},
        { ...headers },
      );
      //const responseData = response.data.posts;
      console.log(response.data.product);
      //setProducts(response.data.product);
      fetchedProducts = response.data.product;  
      currentSkip += PRODUCTS_REQUEST;
    } catch (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
    setLoading(false);
    setSkip(currentSkip);
  }, [skip]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // 무한스크롤 -> 리액트 쿼리로 리팩토링 필요
  useInfiniteScroll(fetchProducts);

  return { products, loading, error };
};

export default getProducts;
