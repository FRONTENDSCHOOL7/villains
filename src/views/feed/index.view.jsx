import React from 'react';
import { Outlet, useLocation } from 'react-router';
import SearchHeader from '../../components/layout/SearchHeader';
import pageUrlConfig from '../../config/pageUrlConfig';
import NavMenu from '../../components/layout/NavMenu';
import SearchLayout from '../../components/layout/SearchLayout';

const FeedIndexPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === pageUrlConfig.feedPage && <SearchLayout />}
      <Outlet />
      {pathname === pageUrlConfig.feedPage && <NavMenu />}
    </>
  );
};

export default FeedIndexPage;
