const useBottomSheetOptions = ({
  currentAccountname,
  authorAccountname,
  postEdit,
  postDelete,
  postReport,
  commentDelete,
  commentReport,
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

    default:
      break;
  }

  return options;
};

export default useBottomSheetOptions;
