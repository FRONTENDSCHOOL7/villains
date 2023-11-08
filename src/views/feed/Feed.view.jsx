import { useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';

import getPosts from '../../api/get/getPosts.api';

import PageTemplate from '../../components/layout/PageTemplate';
import PostCard from '../../components/feed/PostCard';
import FloatingButton from '../../components/default/FloatingButton.style';
import SkeletonCard from '../../components/SkeletonCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import write from '../../assets/img/write.svg';

import useInfinite from '../../hooks/useInfinite';
import getPostListQuery from '../../api/get/getPostList.api';

const FeedPage = () => {
  const { posts, loading, error } = getPosts();

  const navigate = useNavigate();

  const handleFeedWriteNav = () => {
    navigate(pageUrlConfig.feedWritePage);
  };

  const skeletonCards = [...Array(5)].map((_, idx) => <SkeletonCard key={idx} />);
  
  const user = useRouteLoaderData('user');

  const REQUEST_PAGE = 10;
  const [pageParam, setPageParam] = useState(0);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    getPostListQuery(REQUEST_PAGE, pageParam),
  );

  const handleClickMore = () => {
    setPageParam(pageParam+1);
    if (hasNextPage) fetchNextPage();
    console.log(data);
  }
  return (
    <PageTemplate>
      <button onClick={handleClickMore}>more</button>
      {!posts || posts.length === 0 ? (
        skeletonCards
      ) : (
        <PostList>
          {posts.map((post, idx) => (
            <PostCard post={post} key={idx} />
          ))}
          {loading && <LoadingSpinner />}
        </PostList>
      )}

      <FloatingButton img={write} onClick={handleFeedWriteNav} />
    </PageTemplate>
  );
};

export default FeedPage;

const PostList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 20px 20px 78px 20px;
`;
