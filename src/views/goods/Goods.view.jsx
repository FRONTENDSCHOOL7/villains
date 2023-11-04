import React from 'react';
import PageTemplate from '../../components/PageTemplate';
import getProducts from '../../api/get/getProducts.api';
import Goods from '../../components/Goods';

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
