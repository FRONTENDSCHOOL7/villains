import React from 'react';
import styled from 'styled-components';
import Email from '../assets/img/email.svg';

const BlueLongBtn = ({ text, onClick, disabled }) => {
  return (
    <>
      {disabled ? (
        <BlueLongButton onClick={onClick} disabled>
          {text}
        </BlueLongButton>
      ) : (
        <BlueLongButton onClick={onClick}>{text}</BlueLongButton>
      )}
    </>
  );
};
const WhiteLongBtn = ({ text, onClick, disabled }) => {
  return (
    <>
      {disabled ? (
        <WhiteLongButton onClick={onClick} disabled>
          {text}
        </WhiteLongButton>
      ) : (
        <WhiteLongButton onClick={onClick}>{text}</WhiteLongButton>
      )}
    </>
  );
};

const IconBtn = ({ children, onClick, disabled }) => {
  const handleClick = (event) => {
    event.preventDefault();
  }
  return (
        <IconButton onClick={onClick ?? handleClick} disabled={disabled ?? false}>
          {...children}
        </IconButton>
  );
};

const BlueSmallBtn = ({ text, onClick, disabled }) => {
  return (
    <>
      {disabled ? (
        <SmallButton onClick={onClick} disabled>
          {text}
        </SmallButton>
      ) : (
        <SmallButton onClick={onClick}>{text}</SmallButton>
      )}
    </>
  );
};

const BlueLongButton = styled.button`
  padding: 13px 0 13px 0;
  background-color: #3c58c1;
  font-size: 14px;
  color: white;
  border-radius: 9999px;
  border: 1px solid #3c58c1;
  &:disabled {
    border-color: white;
    background-color: #b1bce6;
    cursor: default;
  }
`;

const WhiteLongButton = styled(BlueLongButton)`
  background-color: white;
  color: #3c58c1;
`;

const IconButton = styled(BlueLongButton)`
  color: #767676;
  background-color: white;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: ${(props) => (props.img === Email ? '17.5px 51%' : '14px 51%')};
  &:disabled {
    background-color: white;
    border-color: #767676;
    cursor: default;
  }
`;

const SmallButton = styled(BlueLongButton)`
  padding: 8px 20px 8px 20px;
  border-radius: 32px;
`;

export { BlueLongBtn, WhiteLongBtn, IconBtn, BlueSmallBtn };
