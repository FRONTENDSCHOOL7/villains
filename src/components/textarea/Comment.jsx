import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../../atoms/bottomSheetStateAtom';

import userAtom from '../../atoms/userAtom';
import deleteCommentsQuery from '../../api/delete/deleteComments.api';
import postCommentsReportQuery from '../../api/post/postCommentsReport.api';

import useFormatDate from '../../hooks/useFormatDate';
import useBottomSheetOptions from '../../hooks/useBottomSheetOptions';
import useConfirm from '../../hooks/useConfirm';
import useAlert from '../../hooks/useAlert';

import Modal from '../modal/Modal';
import MoreIcon from '../../components/icon/MoreIcon';
import ConfirmModal from '../modal/ConfirmModal';
import AlertModal from '../modal/AlertModal';

import verticalIcon from '../../assets/img/icon-more-vertical.svg';

const useCommentActions = (id, commentId, removeCommentFromList) => {
  const deleteMutation = useMutation(deleteCommentsQuery(id, commentId));
  const reportMutation = useMutation(postCommentsReportQuery(id, commentId));

  const commentDelete = () => {
    deleteMutation.mutate(
      { id, commentId },
      {
        onSuccess: () => removeCommentFromList(commentId),
        onError: () => alertAction('댓글 삭제에 실패했습니다'),
      },
    );
  };

  const commentReport = () => {
    reportMutation.mutate(
      { id, commentId },
      {
        onSuccess: () => removeCommentFromList(commentId),
        onError: () => alertAction('댓글 신고에 실패했습니다'),
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

  const { isConfirmVisible, confirmMessage, showConfirm, handleConfirm, handleCancel } = useConfirm();
  const { isAlertVisible, alertMessage, showAlert, hideAlert } = useAlert();

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

  // confirm을 위한 액션
  const confirmAction = (message, callback) => {
    showConfirm(message, callback);
    toggleBottomSheetShow();
  };

  // alert를 위한 액션
  const alertAction = (message) => {
    showAlert(message);
    toggleBottomSheetShow();
  };

  return (
    <>
      {isConfirmVisible && (
        <ConfirmModal
          content={confirmMessage}
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {isAlertVisible && (
        <AlertModal
          content={alertMessage}
          confirmText="확인"
          onConfirm={hideAlert}
        />
      )}
      <CommentLi>
        <CommentProfileImage>
        <img
            src={
              comment.author.image === 'http://146.56.183.55:5050/Ellipse.png'
                ? 'https://api.mandarin.weniv.co.kr/Ellipse.png'
                : comment.author.image
            }
            alt=""
          />
        </CommentProfileImage>
        <CommentContent>
          <CommnetHeader>
            <Author>{comment.author.username}</Author>
            <Time>· {time}</Time>
          </CommnetHeader>
          <CommentText>{comment.content}</CommentText>
        </CommentContent>
        <CommentMoreBtn aria-label="댓글 삭제/신고 버튼" onClick={handleBottomSheetShow}>
          <MoreIcon />
        </CommentMoreBtn>
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
  border: 1px solid #c4c4c4;

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
  /* background-size: 18px 18px; */

  display: flex;
  align-items: center;
  justify-content: right;
`;
