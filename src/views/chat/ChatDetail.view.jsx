import styled from 'styled-components';
import PageTemplate from '../../components/PageTemplate';
import Message from '../../components/chat/Message';
import ChatInputField from '../../components/chat/ChatInputField';
import { useState } from 'react';

const ChatDetailPage = () => {
  const [messages, setMessages] = useState([
    // 예시 메시지 데이터
    { id: 1, text: '온수 ~ 부천 택배 요청 수락했습니다! 언제 물건을 가지러 가면 될까요?', time: '12:39', sender: 'customerService' },
    { id: 2, text: '네, 안녕하세요.', time: '12:41', sender: 'user' },
    { id: 3, text: '오늘 3시에 가능하신가요?', time: '12:50', sender: 'user', image: 'path_to_dog_image.jpg' },
    // ...
  ]);

  return (
    <PageTemplate>
      <ChatContainer>
        <MessageList>
          {messages.map((message) => (
            <Message key={message.id} data={message} />
          ))}
        </MessageList>
        <ChatInputField />
      </ChatContainer>
    </PageTemplate>
  );
};

export default ChatDetailPage;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: calc(100vh - 48px);
`;

const MessageList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 16px 68px 16px;
  background: #f2f2f2; // 채팅창 배경색
`;
