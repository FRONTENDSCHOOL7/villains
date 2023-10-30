import React, { useEffect } from 'react';
import styled from 'styled-components';

/**@param list: 필터링된 데이터를 추가하기 */
const DropDown = ({ list }) => {
  return (
    <StyledBox>
      {list.map((d, index) => {
        return <StyledLinkBox>{d[0]}</StyledLinkBox>;
      })}
    </StyledBox>
  );
};

const StyledBox = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const StyledLinkBox = styled.div`
  height: 35px;
  margin: 5px;
  padding: 10px;
  &:hover {
    border-radius: 10px;
    border: 1px solid #3c58c1;
  }
`;

export default DropDown;
