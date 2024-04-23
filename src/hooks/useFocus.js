import { useEffect, useRef } from 'react';

const useFocus = (onClose) => {
  const modalRef = useRef(null);
  const focusableElementsSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    const focusableElements = modalRef.current.querySelectorAll(focusableElementsSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        // 요소가 하나일 경우, 탭 키를 눌러도 포커스가 이동하지 않도록 처리
        if (focusableElements.length === 1) {
          event.preventDefault();
        }

        // Shift + Tab: 첫 번째 요소로 포커스 이동
        else if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
          // Tab: 마지막 요소로 포커스 이동
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }

      // Escape
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return { modalRef };
};

export default useFocus;
