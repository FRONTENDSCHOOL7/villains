import { useNavigate } from 'react-router';
import React from 'react';
import PageTemplate from '../../components/PageTemplate';
import getProducts from '../../api/get/getProducts.api';
import Goods from '../../components/Goods';
import FloatingButton from '../../components/FloatingButton.style';
import WriteIcon from '../../assets/img/write.svg';
import pageUrlConfig from '../../config/pageUrlConfig';

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
