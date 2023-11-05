import styled from 'styled-components';
import theme from '../style/theme';

// TODO : 키보드 접근성 구현
const Modal = ({ content, confirmText, cancelText, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>{content}</ModalContent>
        <ModalFooter>
          {cancelText && <Button onClick={onCancel}>{cancelText}</Button>}
          <Button single={!cancelText} onClick={onConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 410px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 90%;
  max-width: 260px;
  border-radius: 10px;
  border: 0.5px solid #DBDBDB;
`;

const ModalContent = styled.div`
  padding: 22px;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 22px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 0.5px solid #dbdbdb;
`;

const Button = styled.button`
  flex: 1;
  padding: 14px 0;
  border: none;
  border-radius: 0 0 10px 10px;
  cursor: pointer;

  &:first-child {
    color: ${(props) => (props.single ? theme.color.primary : theme.color.black)};
  }

  &:last-child {
    color: ${theme.color.primary};
    border-left: 0.5px solid #dbdbdb;
    border-radius: 0 0 10px 0;
  }
`;
