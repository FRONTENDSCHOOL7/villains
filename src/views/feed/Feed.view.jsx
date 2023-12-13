import { useNavigate } from 'react-router';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';

import getPosts from '../../api/get/getPosts.api';

import PageTemplate from '../../components/layout/PageTemplate';
import PostCard from '../../components/card/PostCard';
import FloatingButton from '../../components/button/FloatingButton.style';
import SkeletonCard from '../../components/card/SkeletonCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import WriteIcon from '../../components/icon/WriteIcon';

const FeedPage = () => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } = getPosts();
  const lastElementRef = useInfinite(hasNextPage, isFetchingNextPage, fetchNextPage);

  console.log('hasNextPage : ', hasNextPage);

  const navigate = useNavigate();

  const handleNavigateToWritePage = () => {
    navigate(pageUrlConfig.feedWritePage);
  };

  const renderPosts = () =>
    posts.map((post, idx) => (
      <PostCard ref={idx === posts.length - 1 ? lastElementRef : null} post={post} key={idx} />
    ));

  return (
    <PageTemplate>
      {posts.length > 0 ? (
        <PostList>
          {renderPosts()}
          {isFetchingNextPage && <LoadingSpinner />}
        </PostList>
      ) : (
        [...Array(5)].map((_, idx) => <SkeletonCard key={idx} />)
      )}

      <FloatingButton img={write} onClick={handleNavigateToWritePage} />
    </PageTemplate>
  );
};

export default FeedPage;

const PostList = styled.ul`
  width: 100%;
  padding: 20px 20px 0 20px;
`;
