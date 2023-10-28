import React from 'react';
import styled from 'styled-components';
import Email from '../assets/img/email.svg';

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

const SnsBtn = ({ background, color, cursor, border, img, text, onClick, disabled }) => {
  return (
    <>
      {disabled ? (
        <SnsButton
          onClick={onClick}
          background={background}
          color={color}
          cursor={cursor}
          border={border}
          img={img}
          disabled
        >
          {text}
        </SnsButton>
      ) : (
        <SnsButton
          onClick={onClick}
          background={background}
          color={color}
          cursor={cursor}
          border={border}
          img={img}
        >
          {text}
        </SnsButton>
      )}
    </>
  );
};

const SmallBtn = ({ background, color, cursor, border, text, onClick, disabled }) => {
  return (
    <>
      {disabled ? (
        <SmallButton
          onClick={onClick}
          background={background}
          color={color}
          cursor={cursor}
          border={border}
          disabled
        >
          {text}
        </SmallButton>
      ) : (
        <SmallButton onClick={onClick} background={background} color={color} cursor={cursor} border={border}>
          {text}
        </SmallButton>
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

const SnsButton = styled(Button)`
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: ${(props) => (props.img === Email ? '17.5px 51%' : '14px 51%')};
`;

const SmallButton = styled(Button)`
  padding: 8px 20px 8px 20px;
  border-radius: 32px;
  flex-grow: 1;
`;

export { CommonBtn, SnsBtn, SmallBtn };
