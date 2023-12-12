import React, { useState } from 'react';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import BottomSheet from '../option/BottomSheet';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import MoreIcon from './MoreIcon';

const Tanghulu = ({onClick}) => {
  const [bottomSheetToggle, setBottomSheetToggle] = useRecoilState(bottomSheetStateAtom);

  const handleTangOnClick = () => {
    setBottomSheetToggle((prevBottomSheetToggle) => !prevBottomSheetToggle);
  };
  
  return (
    <TangIconImg onClick={onClick ?? handleTangOnClick}>
      <MoreIcon />
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
