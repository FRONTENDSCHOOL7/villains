import React, { useState } from 'react';
import styled from 'styled-components';
import ResizingTextarea from './ResizingTextarea';
import imageIcon from '../../assets/img/image-icon.svg';

const ChatInputField = ({ onClick }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onClick(text);
      setText('');
    }
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <StyledInputContainer>
      <ImageBtn bg={imageIcon} />
      <ResizingTextarea rows="1" placeholder="메시지 입력하기..." onChange={handleInputChange} value={text} />
      <SendBtn onClick={handleSend}>전송</SendBtn>
    </StyledInputContainer>
  );
};

export default ChatInputField;

const StyledInputContainer = styled.div`
  width: 410px;
  padding: 12px 20px 12px 16px;
  position: fixed;
  bottom: 0;
  border-top: 0.5px solid #dbdbdb;
  background-color: #fff;

  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const ImageBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: #c4c4c4 url(${(props) => props.bg}) no-repeat center / 22px 22px;
`;

const SendBtn = styled.button`
  font-size: 14px;
  margin-top: 8px;

  &:disabled {
    color: #c4c4c4;
    cursor: default;
  }

  &:enabled {
    color: #3c58c1;
  }
`;
