import styled from "styled-components";
import DefaultBtn, { BasicStyle } from "../GlobalButton";
import theme from "../../style/theme";
import BackArrow from "../../assets/img/icon-arrow-left.svg";
import { useRecoilValue } from "recoil";
import queryFocusAtom from "../../atoms/queryFocusAtom";

const BackHeader = ({onClick, children, focus = true}) => {
  
  return (
    <>
      <StyledHeader>
        {focus && <BackArrowBtn variant={"basic"} onClick={onClick}><img src={BackArrow} alt="뒤로가기" /></BackArrowBtn>}
        {children}
      </StyledHeader>
      
    </>
  )
}

export default BackHeader;

const BackArrowBtn = styled.button`
  ${BasicStyle}

  margin-right: 8px;
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

