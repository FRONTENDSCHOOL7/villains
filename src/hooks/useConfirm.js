import { useState } from 'react';

const useConfirm = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  const showConfirm = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setIsConfirmVisible(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setIsConfirmVisible(false);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return {
    isConfirmVisible,
    confirmMessage,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};

export default useConfirm;
