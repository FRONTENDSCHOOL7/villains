import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
//import pageUrlConfig from '../config/pageUrlConfig';
import styled from 'styled-components';
import getProducts from '../api/getProducts.api';
import Goods from '../components/Goods';

const GoodsPage = () => {
  const { products, loading, error } = getProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;
  return (
    <PageTemplate>
      {!loading &&  <Goods products={products} />}
    </PageTemplate>
  );
};

export default GoodsPage;
