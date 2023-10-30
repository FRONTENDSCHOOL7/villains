import { useParams } from 'react-router';
import getPost from '../api/getPost.api';
import { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import styled from 'styled-components';
import FeedDetail from '../components/feed/FeedDetail';

const FeedDetailPage = () => {
  const { postId } = useParams();
  const { fetchPost, loading, error } = getPost();

  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log(postId);
    const fetchData = async () => {
      const result = await fetchPost(postId);
      setPost(result);
    };
    fetchData();
  }, [postId]);

  return (
    <PageTemplate>
      <Header>{postId} 상세페이지 (임시 헤더)</Header>
      {post && <FeedDetail post={post} />}
    </PageTemplate>
  );
};
export default FeedDetailPage;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;
