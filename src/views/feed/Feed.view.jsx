import { useNavigate } from 'react-router';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';

import PageTemplate from '../../components/PageTemplate';
import getPosts from '../../api/get/getPosts.api';
import PostCard from '../../components/feed/PostCard';
import FloatingButton from '../../components/FloatingButton.style';
import write from '../../assets/img/write.svg';

const FeedPage = () => {
  const { posts, loading, error } = getPosts();

  const navigate = useNavigate();

  const handleFeedWriteNav = () => {
    navigate(pageUrlConfig.feedWritePage);
  };

  return (
    <PageTemplate>
      {posts && (
        <PostList>
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
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
