import { useState } from 'react';

const useAlert = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  return {
    isAlertVisible,
    alertMessage,
    showAlert,
    hideAlert,
  };
};

export default useAlert;
