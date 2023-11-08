import React, { useState } from 'react';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import BottomSheet from './BottomSheet';
import TangImg from '../../assets/img/icon-more-vertical.svg';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Tanghulu = () => {
  const [buttomSheetToggle, setButtomSheetTogle] = useRecoilState(bottomSheetStateAtom);

  const handleTangOnClick = () => {
    setButtomSheetTogle((prevButtomSheekToggle) => !prevButtomSheekToggle);
  };
  return (
    <TangIconImg onClick={handleTangOnClick}>
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
