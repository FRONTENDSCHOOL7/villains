import PostCard from './PostCard';
import styled from 'styled-components';

const Feed = ({ posts }) => {
  return (
      <PostList>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostList>
  );
};

export default Feed;

const PostList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 20px 20px 78px 20px;
`;
