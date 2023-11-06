import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/PageTemplate';
import ChatListItem from '../../components/chat/ChatListItem';

const ChatPage = () => {
  return (
    <PageTemplate>
      <ChatList>
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </ChatList>
    </PageTemplate>
  );
};
export default ChatPage;

const ChatList = styled.ul`
  padding: 24px 0;
`;
