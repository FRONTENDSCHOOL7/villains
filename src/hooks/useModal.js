import { useState } from 'react';

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState(null);

  const showModal = (message, callback) => {
    setModalContent(message);
    setModalAction(() => callback);
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    if (modalAction) modalAction();
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
