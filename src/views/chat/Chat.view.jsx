import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/layout/PageTemplate';
import ChatListItem from '../../components/chat/ChatListItem';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useFormatDate from '../../hooks/useFormatDate';
import getChatPosts from '../../api/get/getChatPost.api';

const ChatPage = () => {
  //const user = useRecoilValue(userAtom);
  const user = JSON.parse(localStorage.getItem('user'));
  const { posts, loading, error } = getChatPosts();

  return (
    <PageTemplate>
      {posts && (
        <ChatList>
          {posts.map((item, idx) => (
            <ChatListItem post={item} key={idx}/>
          ))}
        </ChatList>
      )}
    </PageTemplate>
  );
};
export default ChatPage;

const ChatList = styled.ul`
  padding: 24px 0;
`;
