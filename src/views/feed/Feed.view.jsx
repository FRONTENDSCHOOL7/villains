import { useNavigate, useRouteLoaderData } from 'react-router';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';

import PageTemplate from '../../components/PageTemplate';
import getPosts from '../../api/get/getPosts.api';
import PostCard from '../../components/feed/PostCard';
import FloatingButton from '../../components/FloatingButton.style';
import write from '../../assets/img/write.svg';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { useInfiniteQuery } from '@tanstack/react-query';
import getPostInfiniteQuery from '../../api/get/getPostList.api';

const FeedPage = () => {
  const navigate = useNavigate();
  const target = useRef();
  const user = useRouteLoaderData('user');

  useEffect(() => {
    const observer = new IntersectionObserver(handleInfiniteScroll);
    if (target.current) {
      observer.observe(target.current);
    }
  }, []);

  const [skip, setSkip] = useState(0);
  const [posts, setPosts] = useState([]);
  const [stopRequest, setStopRequest] = useState(false);
  const REQUEST_PAGE = 10;

  const { data, isLoading, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    getPostInfiniteQuery(user, REQUEST_PAGE, skip * REQUEST_PAGE)
  );

  useEffect(() => {
    
    if (hasNextPage && !stopRequest) fetchNextPage();
  }, [skip]);

  //더 이상 불러올 필요가 없을 때 옵저버를 해제합니다.
  useEffect(() => {
    if (stopRequest) observer.disconnect();
  }, [stopRequest]);

  //불러온 데이터를 필터링합니다.
  useEffect(() => {
    console.log(data);
    if(isError) alert('다시 로그인 해주세요');
    if (!isLoading && data) {
      const rowPosts = data.pages[skip]?.data.posts;
      // if(rowPosts[rowPosts.length-1].createdAt) setStopRequest(true);
      const filteredPosts = rowPosts
        .filter((row) => row.content && row.content.includes('villains'))
        .map((row) => ({
          ...row,
          content: JSON.parse(row.content),
        }));
      setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
    }
  }, [data, isLoading]);

  //옵저버에서 호출할 콜백입니다.
  const handleInfiniteScroll = () => {
    setSkip((prev) => prev + 1);
  };

  const handleFeedWriteNav = () => {
    navigate(pageUrlConfig.feedWritePage);
  };

  return (
    <PageTemplate>
        {isLoading ? <div>loading...</div>: 
        (<>
        <PostList>
          {posts.map((post, idx) => (
            <PostCard post={post} key={idx} />
          ))}
        </PostList>
        <Target ref={target}/>
        </>
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

const Target = styled.div`
  position: fixed;
  z-index: -10;
  bottom: 0;
  width: 100%;
  height: 20vh;
`;