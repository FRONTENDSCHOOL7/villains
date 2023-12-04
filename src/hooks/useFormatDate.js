const useFormatDate = (createdAt, mode = 'default') => {
  const now = new Date();
  const created = new Date(createdAt);

  // ms 단위의 시간 차이를 계산
  const diffMs = now - created;
  const diffSec = diffMs / 1000; // 초
  const diffMin = diffSec / 60; // 분
  const diffHour = diffMin / 60; // 시간

  if (mode === 'comment') {
    if (diffMin < 0) {
      return '방금 전'; // 만약 음수라면 방금 전이라고 표시
    } else if (diffMin < 60) {
      return `${Math.floor(diffMin)}분 전`;
    } else if (diffHour < 24) {
      return `${Math.floor(diffHour)}시간 전`;
    }
  }

  return `${created.getFullYear()}년 ${created.getMonth() + 1}월 ${created.getDate()}일`;
};

export default useFormatDate;
