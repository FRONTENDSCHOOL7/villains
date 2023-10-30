import styled from 'styled-components';

const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3c58c1 url(${(props) => props.img}) no-repeat center;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));

  position: fixed;
  bottom: 66px;
  right: calc(50% - 195px + 16px);
`;

export default FloatingButton;
