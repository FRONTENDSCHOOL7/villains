import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/layout/PageTemplate';
import ChatListItem from '../../components/chat/ChatListItem';
import getChatPosts from '../../api/get/getChatPost.api';
import SkeletonList from '../../components/SkeletonList';
import SkeletonChatList from '../../components/SkeletonChatList';

const ChatPage = () => {
  //const user = useRecoilValue(userAtom);
  const user = JSON.parse(localStorage.getItem('user'));
  const { posts, loading, error } = getChatPosts();
  const skeletonLists = [...Array(5)].map((_, idx) => <SkeletonChatList key={idx} />);

  return (
    <PageTemplate>
      {posts && (
        <ChatList>
          {posts.map((item, idx) => (
            <ChatListItem post={item} key={idx}/>
          ))}
        </ChatList>
      )}
      {loading && skeletonLists}
    </PageTemplate>
  );
};
export default ChatPage;

const ChatList = styled.ul`
  
`;
