import PostCard from './PostCard';
import styled from 'styled-components';
import write from '../../assets/img/write.svg';
import { useNavigate } from 'react-router-dom';
import pageUlrConfig from '../../config/pageUrlConfig';
import FloatingButton from '../FloatingButton.style';

const Feed = ({ posts }) => {
  const navigate = useNavigate();


  const handleFeedWriteNav= () => {
    navigate(pageUlrConfig.feedWritePage);
  };

  return (
    <div>
      <Header>피드(임시 헤더)</Header>

      <PostList>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostList>
      <FloatingButton img={write} onClick={handleFeedWriteNav} />
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
