import styled from 'styled-components';
import profileImage from '../../assets/img/basic-profile.svg';
import verticalIcon from '../../assets/img/icon-more-vertical.svg';
import useFormatDate from '../../hooks/useFormatDate';

const Comment = ({ comment }) => {
  const time = useFormatDate(comment.createdAt, 'comment')

  return (
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
      <CommentMoreBtn aria-label="댓글 삭제/신고 버튼" />
    </CommentLi>
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
