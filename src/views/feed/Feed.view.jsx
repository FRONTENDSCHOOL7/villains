import { useNavigate, useRouteLoaderData } from 'react-router';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';

import PageTemplate from '../../components/PageTemplate';
import PostCard from '../../components/feed/PostCard';
import FloatingButton from '../../components/FloatingButton.style';
import write from '../../assets/img/write.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getPostInfiniteQuery from '../../api/get/getPostList.api';

const FeedPage = () => {
  const navigate = useNavigate();
  const targetRef = useRef();
  const [target, setTarget] = useState(targetRef);
  const user = useRouteLoaderData('user');

  const REQUEST_PAGE = 10;
  const [skip, setSkip] = useState(1);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    getPostInfiniteQuery(user, REQUEST_PAGE, skip)
    );

  const filterPost = (data) => {
    if(!data?.pages) return [];
    const currentPages = data.pages;
    const rowPosts = currentPages[currentPages.length-1].data.posts;
    const filteredPosts = rowPosts
          .filter((row) =>row.content && row.content.includes('villains'))
          .map((row) => ({
            ...row,
            content: JSON.parse(row.content),
    }));
    return filteredPosts;
  }
  const [posts, setPosts] = useState([...filterPost(data)]);
  const [postLength, setPostLength] = useState(posts.length);
  

  const handleInfiniteScroll = (entries) =>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        if(isError) alert('다시 로그인 해주세요');
        setPosts([...filterPost(data)]);
        setSkip(prev => (prev) * REQUEST_PAGE);
      } 
    })
  }
  useEffect(() => {
    const observer = new IntersectionObserver(handleInfiniteScroll);
    if (target.current) {
      observer.observe(target.current);
      console.log('?')
    }
  }, [target]);

   useEffect(()=>{
    if (hasNextPage) fetchNextPage();
   },[skip])

   useEffect(()=>{
    if(!isFetching && skip != 0) setPosts([...posts, ...filterPost(data)]);
   }, [isFetching])


   useIntersectionObserver({
      target: target,
      onIntersect: fetchNextPage,
      enabled: !!hasNextPage,
  })

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
        <Target ref={setTarget}/>
        </PostList>
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
  width: 100%;
  height: 20vh;
`;