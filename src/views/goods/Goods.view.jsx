import React from 'react';
import PageTemplate from '../../components/PageTemplate';
import getProducts from '../../api/get/getProducts.api';
import Goods from '../../components/Goods';

const GoodsPage = () => {
  const { products, loading, error } = getProducts();

  const navigate = useNavigate();
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error loading posts: {error.message}</div>;
  const handleWriteBtnOnClick = () => {
    navigate(pageUrlConfig.goodsWritePage);
  };

  return (
    <PageTemplate>
      <Goods products={products} />
      <FloatingButton img={WriteIcon} onClick={handleWriteBtnOnClick}></FloatingButton>
    </PageTemplate>
  );
};

export default GoodsPage;
