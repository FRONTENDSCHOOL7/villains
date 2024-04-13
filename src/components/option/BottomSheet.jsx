import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../../atoms/bottomSheetStateAtom';

const BottomSheet = () => {
  const [isVisible, setIsVisible] = useRecoilState(bottomSheetStateAtom);
  const options = useRecoilValue(bottomSheetOptions);

  const wrapperRef = useRef(null);

  const handleBottomSheetClose = () => {
    setIsVisible(false);
  };

  return isVisible &&
    <>
      <Overlay onClick={handleBottomSheetClose} />
      <BottomSheetWrapper ref={wrapperRef}>
        <CloseButton onClick={handleBottomSheetClose} />
        {options.map((option, index) => (
          <Option key={index} onClick={option.callback}>
            {option.label}
          </Option>
        ))}
      </BottomSheetWrapper>
    </>
};

export default BottomSheet;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 410px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const BottomSheetWrapper = styled.div`
  width: 410px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 36px 0 16px 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);

  transition: all 0.3s;

  z-index: 1000;
`;

const Option = styled.div`
  font-size: 14px;
  padding: 20px 26px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const CloseButton = styled.button`
  width: 50px;
  height: 4px;
  border-radius: 5px;
  background: #dbdbdb;

  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
`;
