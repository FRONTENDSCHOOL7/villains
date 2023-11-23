import React, { useState } from 'react';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import BottomSheet from '../option/BottomSheet';
import TangImg from '../../assets/img/icon-more-vertical.svg';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Tanghulu = ({onClick}) => {
  const [bottomSheetToggle, setBottomSheetToggle] = useRecoilState(bottomSheetStateAtom);

  const handleTangOnClick = () => {
    setBottomSheetToggle((prevBottomSheetToggle) => !prevBottomSheetToggle);
  };
  
  return (
    <TangIconImg onClick={onClick ?? handleTangOnClick}>
      <img src={TangImg}></img>
    </TangIconImg>
  );
};
const TangIconImg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 100%;
`;

export default Tanghulu;
