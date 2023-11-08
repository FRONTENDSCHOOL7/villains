import { useNavigate, useRouteLoaderData } from 'react-router';
import styled from 'styled-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getPostInfiniteQuery from '../api/get/getPostList.api';
import pageUrlConfig from '../config/pageUrlConfig';

const useInfinite = () => {
  // const navigate = useNavigate();
  // const [target, setTarget] = useState(targetRef);

  if (hasNextPage) fetchNextPage();
};

// const filterPost = (data) => {
//   if (!data?.pages) return [];
//   const currentPages = data.pages;
//   const rowPosts = currentPages[currentPages.length - 1].data.posts;
//   const filteredPosts = rowPosts
//     .filter((row) => row.content && row.content.includes('villains'))
//     .map((row) => ({
//       ...row,
//       content: JSON.parse(row.content),
//     }));
//   return filteredPosts;
// };

export default useInfinite;

const PostList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 20px 20px 78px 20px;
`;

const Target = styled.div`
  width: 100%;
  height: 20vh;
`;
