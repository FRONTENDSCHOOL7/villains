import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
//?? handleResizeHeight를 외부로 빼서 다른 textarea에서도 쉽게 적용할 수 있도록 하는 건 어떤가요?
const ResizingTextarea = ({ onChange, ...props }) => {
  const textareaRef = useRef();

  useEffect(() => {
    handleResizeHeight();
  }, [props.value]);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return <StyledTextarea ref={textareaRef} onChange={onChange} {...props} />;
};

export default ResizingTextarea;

const StyledTextarea = styled.textarea`
  width: 100%;
  flex:1;
  padding:8px 0;
  font-size: 14px;
  border: none;
  resize: none;
  line-height: 20px;

  &::placeholder {
    color: #c4c4c4;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  /* &:focus {
    outline: 2px solid #3c58c1;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  } */
`;
