import { useState } from 'react';

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState(() => {});

  const showModal = (message, action) => {
    setModalContent(message);
    setModalAction(() => action);
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    modalAction();
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    modalContent,
    showModal,
    handleModalConfirm,
    handleModalCancel,
  };
};

export default useModal;
