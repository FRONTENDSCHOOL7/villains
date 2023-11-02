import styled from 'styled-components';
import profileImage from '../../assets/img/basic-profile.svg';
import verticalIcon from '../../assets/img/icon-more-vertical.svg';
import useFormatDate from '../../hooks/useFormatDate';
import { useSetRecoilState } from 'recoil';
import { bottomSheetStateAtom, bottomSheetOptions } from '../../atoms/bottomSheetStateAtom';
import deleteCommentsQuery from '../../api/deleteComments.api';
import postCommentsReportQuery from '../../api/postCommentsReport.api';
import { useMutation } from '@tanstack/react-query';

const useCommentActions = (postId, commentId, removeCommentFromList) => {
  const deleteMutation = useMutation(deleteCommentsQuery(postId, commentId));
  const reportMutation = useMutation(postCommentsReportQuery(postId, commentId));

  const handleDelete = () => {
    deleteMutation.mutate(
      { postId, commentId },
      {
        onSuccess: () => removeCommentFromList(commentId),
        onError: () => alert('댓글 삭제에 실패했습니다'),
      },
    );
  };

  const handleReport = () => {
    reportMutation.mutate(
      { postId, commentId },
      {
        onSuccess: () => removeCommentFromList(commentId),
        onError: () => alert('댓글 신고에 실패했습니다'),
      },
    );
  };

  return { handleDelete, handleReport };
};


const Comment = ({ comment, postId, removeCommentFromList }) => {
  const setIsVisible = useSetRecoilState(bottomSheetStateAtom);
  const setOptions = useSetRecoilState(bottomSheetOptions);
  const time = useFormatDate(comment.createdAt, 'comment');

  const { handleDelete, handleReport } = useCommentActions(postId, comment.id, removeCommentFromList);

  const currentAccountname = JSON.parse(localStorage.getItem('user')).accountname;
  
  const toggleBottomSheetShow = () => setIsVisible((prev) => !prev);

  const handleBottomSheetShow = () => {
    const options =
      currentAccountname === comment.author.accountname
        ? [{ label: '댓글 삭제', callback: () => confirmAction('댓글을 삭제할까요?', handleDelete) }]
        : [{ label: '댓글 신고', callback: () => confirmAction('댓글을 신고할까요?', handleReport) }];
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
