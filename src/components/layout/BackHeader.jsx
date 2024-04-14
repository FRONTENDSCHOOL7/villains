import styled from 'styled-components';
import DefaultBtn, { BasicStyle } from '../button/GlobalButton';
import theme from '../../style/theme';
import ArrowIcon from '../icon/ArrowIcon';
import { useRecoilValue } from 'recoil';
import queryFocusAtom from '../../atoms/queryFocusAtom';
import { useEffect, useState } from 'react';
import queryAtom from '../../atoms/queryAtom';

const BackHeader = ({ onClick, children }) => {
  const query = useRecoilValue(queryAtom);
  const [showArrowIcon, setShowArrowIcon] = useState(false);

  useEffect(() => {
    if (query) setShowArrowIcon(true);
    else setShowArrowIcon(false);
  }, [query]);

  return (
    <>
      <StyledHeader>
        {showArrowIcon && (
          <ArrowIconBtn variant={'basic'} onClick={onClick}>
            <ArrowIcon />
          </ArrowIconBtn>
        )}
        {children}
      </StyledHeader>
      <BackGround />
    </>
  );
};

export default BackHeader;

const ArrowIconBtn = styled.button`
  ${BasicStyle}

  margin-right: 8px;
`;

const BackGround = styled.div`
  height: 48px;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  padding: 8px 16px;
  max-width: 410px;
  height: 48px;
  z-index: 10;
  background-color: ${theme.color.white};
  border-bottom: 1px solid #dbdbdb;
`;
