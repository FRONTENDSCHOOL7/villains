import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../../atoms/bottomSheetStateAtom';

import userAtom from '../../atoms/userAtom';
import deleteCommentsQuery from '../../api/delete/deleteComments.api';
import postCommentsReportQuery from '../../api/post/postCommentsReport.api';

import useFormatDate from '../../hooks/useFormatDate';
import useBottomSheetOptions from '../../hooks/useBottomSheetOptions';
import useModal from '../../hooks/useModal';

import Modal from '../modal/Modal';

import profileImage from '../../assets/img/basic-profile.svg';
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

  // useModal 훅 사용
  const { isModalVisible, modalContent, showModal, handleModalConfirm, handleModalCancel } = useModal();

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
    showModal(message, callback);
    toggleBottomSheetShow();
  };

  // alert를 위한 액션
  const alertAction = (message) => {
    showModal(message);
    toggleBottomSheetShow();
  };

  return (
    <>
      {isModalVisible && (
        <Modal
          content={modalContent}
          confirmText="확인"
          cancelText={confirmAction ? "취소" : null}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
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
