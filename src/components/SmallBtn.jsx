import React from 'react';
import styled from 'styled-components';

const CommonBtn = ({ background, color, cursor, border, text, onClick, disabled }) => {
  return (
    <>
      {disabled ? (
        <Button
          onClick={onClick}
          background={background}
          color={color}
          cursor={cursor}
          border={border}
          disabled
        >
          {text}
        </Button>
      ) : (
        <Button onClick={onClick} background={background} color={color} cursor={cursor} border={border}>
          {text}
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  padding: 13px 0 13px 0;
  background-color: ${(props) => props.background};
  font-size: 14px;
  color: ${(props) => props.color};
  border-radius: 9999px;
  border: 1px solid #3c58c1;
  border-color: ${(props) => props.border};
  cursor: ${(props) => props.cursor};
`;

export default CommonBtn;
