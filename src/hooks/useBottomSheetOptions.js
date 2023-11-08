//인자 받을 때, 객체로 구조분해 할당하는 것보단, 인자의 순서대로 분류해서 받는 것은 어떠할까요?
const useBottomSheetOptions = ({
  currentAccountname,
  authorAccountname,
  postEdit,
  postDelete,
  postReport,
  commentDelete,
  commentReport,
  logout,
  profileReport,
  type,
}) => {
  let options = [];

  switch (type) {
    case 'post':
      if (currentAccountname === authorAccountname) {
        options = [
          { label: '게시글 수정', callback: postEdit },
          { label: '게시글 삭제', callback: postDelete },
        ];
      } else {
        options = [{ label: '게시글 신고', callback: postReport }];
      }
      break;

    case 'comment':
      if (currentAccountname === authorAccountname) {
        options = [{ label: '댓글 삭제', callback: commentDelete }];
      } else {
        options = [{ label: '댓글 신고', callback: commentReport }];
      }
      break;

    case 'user':
      if (currentAccountname === authorAccountname) {
        options = [{ label: '로그아웃', callback: logout }];
      } else {
        options = [{ label: '유저 신고', callback: profileReport }];
      }
      break;

    default:
      break;
  }

  return options;
};

export default useBottomSheetOptions;
