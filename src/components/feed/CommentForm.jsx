import { useState } from 'react';
import styled from 'styled-components';
import ResizingTextarea from './ResizingTextarea';

const CommentForm = ({ id, uploadComment, profileImage, setCommentsList }) => {
  const [inputComment, setInputComment] = useState('');

  const handlePostComments = async (event) => {
    event.preventDefault();

    const newComment = await uploadComment(id, inputComment);

    if (newComment) {
      // 새 댓글을 포함하도록 commentsList 상태를 업데이트
      setCommentsList((prevCommentsList) => [...prevCommentsList, newComment]);

      setInputComment('');
    }
  };

  const handleCommentChange = (event) => {
    setInputComment(event.target.value);
  };

  return (
    <StyledCommentForm onSubmit={handlePostComments}>
      {/* 프로필 기본이미지 수정 필요 */}
      <CommentImage src={profileImage} alt="" />
      <ResizingTextarea
        rows="1"
        placeholder="댓글 입력하기..."
        onChange={handleCommentChange}
        value={inputComment}
      />
      <CommentBtn disabled={!inputComment}>게시</CommentBtn>
    </StyledCommentForm>
  );
};

export default CommentForm;

const StyledCommentForm = styled.form`
  width: 410px;
  padding: 12px 20px 12px 16px;
  position: fixed;
  bottom: 0;
  border-top: 0.5px solid #dbdbdb;
  background-color: #fff;

  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const CommentImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid #dbdbdb;
`;

const CommentBtn = styled.button`
  font-size: 14px;
  margin-top: 8px;

  &:disabled {
    color: #c4c4c4;
    cursor: default;
  }

  &:enabled {
    color: #3c58c1;
  }
`;
