import ReactDOM from 'react-dom';
import useFocus from '../../hooks/useFocus';
import { ModalOverlay, ModalContainer, ModalContent, ModalFooter, Button } from './Modal.style';

const ConfirmModal = ({ content, confirmText, cancelText, onConfirm, onCancel }) => {
  const { modalRef } = useFocus(onCancel);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onCancel}>
      <ModalContainer ref={modalRef}>
        <ModalContent>{content}</ModalContent>
        <ModalFooter>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal-root'),
  );
};

export default ConfirmModal;
