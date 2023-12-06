import ReactDOM from 'react-dom';
import useFocus from '../../hooks/useFocus';
import { ModalOverlay, ModalContainer, ModalContent, ModalFooter, Button } from './Modal.style';

const AlertModal = ({ content, confirmText, onConfirm }) => {
  const { modalRef } = useFocus();

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContainer ref={modalRef}>
        <ModalContent>{content}</ModalContent>
        <ModalFooter>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal-root'),
  );
};

export default AlertModal;
