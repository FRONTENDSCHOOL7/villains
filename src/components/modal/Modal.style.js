import styled from 'styled-components';
import theme from '../../style/theme';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 410px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 90%;
  max-width: 260px;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
  z-index: 10000;
`;

export const ModalContent = styled.div`
  padding: 22px;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 22px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 0.5px solid #dbdbdb;
`;

export const Button = styled.button`
  flex: 1;
  padding: 14px 0;
  border: none;
  border-radius: 0 0 10px 10px;
  cursor: pointer;

  &:only-child {
    color: ${theme.color.primary};
  }

  &:first-child:not(:last-child) {
    color: ${theme.color.black};
  }

  &:last-child:not(:first-child) {
    color: ${theme.color.primary};
    border-left: 0.5px solid #dbdbdb;
    border-radius: 0 0 10px 0;
  }
`;
