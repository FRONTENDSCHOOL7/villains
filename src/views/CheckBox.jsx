import React from 'react';
import styled from 'styled-components';

const CheckBox = ({ text, id, name, checked, onChange }) => {
  return (
    <CheckBoxWrap>
      <HideCheckBox id={id} type="checkbox" name={name} checked={checked} onChange={onChange}></HideCheckBox>
      <CheckBoxLabel htmlFor={id}>{text}</CheckBoxLabel>
    </CheckBoxWrap>
  );
};

const CheckBoxWrap = styled.div`
  display: flex;
`;
const CheckBoxLabel = styled.label`
  font-size: 12px;
  color: #767676;
  position: relative;
  &::before {
    display: inline-block;
    content: '';
    width: 19px;
    height: 20px;
    vertical-align: -6.4px;
    margin-right: 8px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 5px;
    left: 6px;
    top: 6px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(-45deg);
  }
`;
const HideCheckBox = styled.input`
  overflow: hidden;
  width: 1px;
  height: 1px;
  margin: 0;
  clip-path: inset(50%);
  &:checked + ${CheckBoxLabel}::before {
    background-color: #3c58c1;
    border: 1px solid #3c58c1;
  }
  &:checked + ${CheckBoxLabel}::after {
    border-left: 2px solid white;
    border-bottom: 2px solid white;
  }
`;

export default CheckBox;
