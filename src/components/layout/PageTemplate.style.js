import styled from 'styled-components';
import theme from '../../style/theme';

const Wrap = styled.div`
  max-width: 412px;
  min-height: 100vh;
  margin: 0 auto;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  position: relative;
  background-color: #fff;
`;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 48px - 80px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px; /* 세로축 스크롤바 폭 너비 */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background-color: ${theme.color.light};
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.color.white};
  }
`;

export { Wrap, Main };
