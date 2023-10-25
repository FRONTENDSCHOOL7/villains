import PostCard from './PostCard';
import styled from 'styled-components';

const Feed = ({ posts }) => {
  return (
    <div>
      <Header>피드(임시 헤더)</Header>

      <PostList>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostList>
    </div>
  );
};

export default Feed;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;

const PostList = styled.ul`
  padding: 20px 20px 0 20px;
`;
