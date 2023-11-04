import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/**@param list: 필터링된 데이터를 추가하기 */
const DropDown = ({ list, state, onClick }) => {
  return (
    <StyledBox>
      {list
        ? list.map((d, index) => {
            return (
              <StyledLinkBox key={`list_${index}`} onClick={onClick} data-etc={d[1]}>
                {d[0]}
              </StyledLinkBox>
            );
          })
        : state.map((d, index) => {
            return (
              <StateBox key={index} onClick={onClick}>
                {d}
              </StateBox>
            );
          })}
    </StyledBox>
  );
};

const StyledBox = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
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
const StateBox = styled(StyledLinkBox)`
  text-align: center;
`

export default DropDown;
