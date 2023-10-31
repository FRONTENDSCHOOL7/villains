import styled from 'styled-components';
import profileImage from '../../assets/img/basic-profile.svg';
import useFormatDate from '../../hooks/useFormatDate';

const Comment = ({ comment }) => {
  console.log(comment);

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
          <Time>· 5분 전</Time>
        </CommnetHeader>
        <p>{comment.content}</p>
      </CommentContent>
      <button>버튼</button>
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
