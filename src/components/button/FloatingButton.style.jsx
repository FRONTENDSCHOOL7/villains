import styled from 'styled-components';

const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3c58c1;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));

  position: fixed;
  bottom: 100px;
  right: calc(50% - 206px + 16px);
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FloatingButton;
