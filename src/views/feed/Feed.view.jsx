import { useNavigate } from 'react-router';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';

import getPosts from '../../api/get/getPosts.api';

import PageTemplate from '../../components/layout/PageTemplate';
import PostCard from '../../components/card/PostCard';
import FloatingButton from '../../components/button/FloatingButton.style';
import SkeletonCard from '../../components/card/SkeletonCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import write from '../../assets/img/write.svg';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useEffect, useRef } from 'react';
import useInfinite from '../../hooks/useInfinite';

const FeedPage = () => {
  // const { posts, loading, error } = getPosts();

  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = getPosts();
  const lastElementRef = useInfinite(hasNextPage, isFetchingNextPage, fetchNextPage);

  const navigate = useNavigate();

  const handleFeedWriteNav = () => {
    navigate(pageUrlConfig.feedWritePage);
  };

  const skeletonCards = [...Array(5)].map((_, idx) => <SkeletonCard key={idx} />);

  return (
    <PageTemplate>
      {!posts || posts.length === 0 ? (
        skeletonCards
      ) : (
        <PostList>
          {posts.map((post, idx) =>
            idx === posts.length - 1 ? (
              <PostCard ref={lastElementRef} post={post} key={idx} />
            ) : (
              <PostCard post={post} key={idx} />
            ),
          )}
          {isFetchingNextPage && <LoadingSpinner />}
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
