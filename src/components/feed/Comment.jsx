import styled from 'styled-components';
import profileImage from '../../assets/img/basic-profile.svg';
import verticalIcon from '../../assets/img/icon-more-vertical.svg';
import useFormatDate from '../../hooks/useFormatDate';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../../atoms/bottomSheetStateAtom';
import deleteCommentsQuery from '../../api/delete/deleteComments.api';
import postCommentsReportQuery from '../../api/post/postCommentsReport.api';
import { useMutation } from '@tanstack/react-query';
import userAtom from '../../atoms/userAtom';
import useBottomSheetOptions from '../../hooks/useBottomSheetOptions';

const useCommentActions = (id, commentId, removeCommentFromList) => {
  const deleteMutation = useMutation(deleteCommentsQuery(id, commentId));
  const reportMutation = useMutation(postCommentsReportQuery(id, commentId));

  const commentDelete = () => {
    deleteMutation.mutate(
      { id, commentId },
      {
        onSuccess: () => removeCommentFromList(commentId),
        onError: () => alert('댓글 삭제에 실패했습니다'),
      },
    );
  };

  const commentReport = () => {
    reportMutation.mutate(
      { id, commentId },
      {
        onSuccess: () => removeCommentFromList(commentId),
        onError: () => alert('댓글 신고에 실패했습니다'),
      },
    );
  };

  return { commentDelete, commentReport };
};

const Comment = ({ comment, id, removeCommentFromList }) => {
  const setIsVisible = useSetRecoilState(bottomSheetStateAtom);
  const setOptions = useSetRecoilState(bottomSheetOptions);
  const time = useFormatDate(comment.createdAt, 'comment');

  const { commentDelete, commentReport } = useCommentActions(id, comment.id, removeCommentFromList);

  const toggleBottomSheetShow = () => setIsVisible((prev) => !prev);

  const currentAccountname = useRecoilValue(userAtom).accountname;
  const authorAccountname = comment.author.accountname;

  const options = useBottomSheetOptions({
    currentAccountname,
    authorAccountname,
    commentDelete: () => confirmAction('댓글을 삭제할까요?', commentDelete),
    commentReport: () => confirmAction('댓글을 신고할까요?', commentReport),
    type: 'comment',
  });

  const handleBottomSheetShow = (event) => {
    event.stopPropagation();
    setOptions(options);
    toggleBottomSheetShow();
  };

  // TODO : 확인창 모달로 수정 필요
  const confirmAction = (message, action) => {
    if (confirm(message)) {
      action();
    }
    toggleBottomSheetShow();
  };

  return (
    <>
      <CommentLi>
        <CommentProfileImage>
          {/* 프로필 기본이미지 수정 필요 */}
          {/* <img src={comment.author.image} alt={comment.author.username} /> */}
          <img src={profileImage} alt={comment.author.username} />
        </CommentProfileImage>
        <CommentContent>
          <CommnetHeader>
            <Author>{comment.author.username}</Author>
            <Time>· {time}</Time>
          </CommnetHeader>
          <CommentText>{comment.content}</CommentText>
        </CommentContent>
        <CommentMoreBtn aria-label="댓글 삭제/신고 버튼" onClick={handleBottomSheetShow} />
      </CommentLi>
    </>
  );
};

export default Comment;

const CommentLi = styled.li`
  margin-bottom: 20px;
  background-color: #fff;

  display: flex;
  align-items: flex-start;
`;

const CommentProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  border: 0.5px solid #dbdbdb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 16px;
`;

const CommnetHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Author = styled.span`
  display: block;
  margin: 8px 0;
`;

const Time = styled.span`
  display: block;
  color: #767676;
  font-size: 10px;
  margin-top: 2px;
`;

const CommentText = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;

  line-height: 20px;
`;

const CommentMoreBtn = styled.button`
  width: 40px;
  height: 20px;
  background: url(${verticalIcon}) no-repeat center right;
  background-size: 18px 18px;
`;
