import PageTemplate from '../components/PageTemplate';
import getPosts from '../api/getPosts.api';
import styled from 'styled-components';
import PostCard from '../components/feed/PostCard';

const FeedPage = () => {
  const { posts, loading, error } = getPosts();

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <PageTemplate>
      {posts&& <PostList>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostList>}
  </PageTemplate>
  );
};

export default FeedPage;

const PostList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 20px 20px 78px 20px;
`;
