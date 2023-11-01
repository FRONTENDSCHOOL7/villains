import PostCard from './PostCard';
import styled from 'styled-components';

const Feed = ({ posts }) => {

  return (
    <div>
      <PostList>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostList>
    </div>
  );
};

export default Feed;

const PostList = styled.ul`
  width: 100%;
  padding: 20px 20px 0 20px;
`;
