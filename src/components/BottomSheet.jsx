import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../atoms/bottomSheetStateAtom';

const BottomSheet = () => {
  const [isVisible, setIsVisible] = useRecoilState(bottomSheetStateAtom);
  const options = useRecoilValue(bottomSheetOptions);

  const wrapperRef = useRef(null);

  // TODO : 바텀 시트가 아닌 다른 곳을 누르면 바텀시트가 사라지도록 수정
  // const handleOutsideClick = (e) => {
  //   if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
  //     setIsVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);

  console.log('recoil visible : ', isVisible);

  return isVisible ? (
    <BottomSheetWrapper>
      <CloseButton onClick={() => setIsVisible(false)} />
      {options.map((option, index) => (
        <Option key={index} onClick={option.callback}>
          {option.label}
        </Option>
      ))}
    </BottomSheetWrapper>
  ) : null;
};

export default BottomSheet;

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
  padding: 16px 26px;
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
