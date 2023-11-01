import { useEffect } from 'react';

const useBlockToBack = (content, navigate, pageUrl) => {
  const preventGoBack = (e) => {
    console.log(window.history.length);
    if (content) {
      e.preventDefault(); // 브라우저의 뒤로가기 기본 동작 방지
      if (confirm('입력 중인 내용을 취소하고 뒤로가시겠습니까?')) {
        navigate(pageUrl); // 뒤로가기
      }
    } else {
      navigate(pageUrl);
    }
  };

  useEffect(() => {
    history.pushState(null, '');

    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, [navigate]);

  return preventGoBack;
};
export default useBlockToBack;
