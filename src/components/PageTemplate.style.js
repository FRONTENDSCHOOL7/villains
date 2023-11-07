import styled from 'styled-components';

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
  min-height: calc(100vh - 48px - 77px);
`;

export { Wrap, Main };
