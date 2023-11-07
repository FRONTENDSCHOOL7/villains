import styled from 'styled-components';

const Wrap = styled.div`
  max-width: 412px;
  min-height: 100vh;
  margin: 0 auto;
  border-left: 0.5px solid #dbdbdb;
  border-right: 0.5px solid #dbdbdb;
  position: relative;
`;

const Main = styled.main`
  overflow-y: scroll;
  width: 100%;
  height: caLc(100vh - 48px - 77px);
  // min-height: calc(100vh - 48px - 77px);
`;

export { Wrap, Main };
