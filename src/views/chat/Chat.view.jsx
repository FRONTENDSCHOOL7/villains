import React, { useState } from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/PageTemplate';
import ChatListItem from '../../components/chat/ChatListItem';

const ChatPage = () => {
  const [chatList, setChatList] = useState([
    // 예시 데이터
    {
      id: 1,
      username: '1호선 빌런 꿈나무',
      content: '우리, 친하게 지내요 :)',
      date: '2023.11.07',
    },
    {
      id: 2,
      username: 'SUBONE 고객센터',
      content: '안녕하세요, 고객 서비스입니다.😊😊😊',
      date: '2023.11.06',
    },
    {
      id: 3,
      username: '택배요정',
      content: '온수 ~ 부천 택배 요청 수락했습니다! 언제 물건을 가지러 가면 될까요?',
      date: '2023.11.05',
    },
    // ...
  ]);

  return (
    <PageTemplate>
      <ChatList>
        {chatList.map((item, idx) => (
          <ChatListItem username={item.username} content={item.content} date={item.date} ket={idx} />
        ))}
      </ChatList>
    </PageTemplate>
  );
};
export default ChatPage;

const ChatList = styled.ul`
  padding: 24px 0;
`;
