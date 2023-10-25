import PostCard from './PostCard';
import styled from 'styled-components';
import write from '../../assets/write.svg';
import { useNavigate } from 'react-router-dom';
import pageUlrConfig from '../../config/pageUrlConfig';

const Feed = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header>피드(임시 헤더)</Header>

      <PostList>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostList>
      <FloatingButton
        img={write}
        onClick={() => {
          navigate(pageUlrConfig.feedWritePage);
        }}
      />
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
  width: 100%;
  padding: 20px 20px 0 20px;
`;

const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3c58c1 url(${(props) => props.img}) no-repeat center;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));

  position: fixed;
  bottom: 66px;
  right: calc(50% - 195px + 16px);
`;
