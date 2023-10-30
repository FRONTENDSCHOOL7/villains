import { useParams } from 'react-router';
import getPost from '../api/getPost.api';
import { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import styled from 'styled-components';

const FeedDetailPage = () => {
  const { postId } = useParams();
  const { fetchPost, loading, error } = getPost();

  const [post, setPost] = useState({});

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
      <Header>피드(임시 헤더)</Header>
      <div>{postId}게시글 상세페이지</div>
      {post && <p>{post.content}</p>}
    </PageTemplate>
  );
};
export default FeedDetailPage;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;
