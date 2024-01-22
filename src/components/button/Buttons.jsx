import React from 'react';
import styled, { css } from 'styled-components';
import EmailIcon from '../icon/EmailIcon';
import { PrimaryStyle } from './GlobalButton';
import Size from '../icon/Icon.style';

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

const IconBtn = ({ children, onClick, disabled}) => {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <IconButton onClick={onClick ?? handleClick} disabled={disabled ?? false}>
      {children}
    </IconButton>
  );
};

const BlueSmallBtn = ({ children, onClick, disabled }) => {
  return (
    <SmallButton onClick={onClick} disabled={disabled ?? false}>
      {children}
    </SmallButton>
  );
};

const IconLabelBtn = ({ children, count, onClick, disabled }) => {
  return (
    <IconLabelButton onClick={onClick} disabled={disabled}>
      {children}
      <span>{count}</span>
    </IconLabelButton>
  );
};

const BlueLongButton = styled.button`
  ${PrimaryStyle}
  padding: 13px 0;
  font-size: 14px;
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
  position: relative;
  background-color: white;
  &:disabled {
    background-color: white;
    border-color: #767676;
    cursor: default;
  }
  & > :first-child{
    position: absolute;
    inset: 0;
    margin: auto;
    margin-left: 14px;
  }
`;

const SmallButton = styled(BlueLongButton)`
  padding: 5px 20px;
  border-radius: 32px;
`;

const IconLabelButton = styled.button`
  display: flex;
  gap: 4px;
  color: #767676;
  font-size: 12px;
  line-height: 20px;
`;

export { BlueLongBtn, WhiteLongBtn, IconBtn, BlueSmallBtn, IconLabelBtn };
