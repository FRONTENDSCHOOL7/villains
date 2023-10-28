import styled from 'styled-components';
import heart from '../../assets/img/heart.svg';
import heartFilled from '../../assets/img/heart-filled.svg';
import comment from '../../assets/img/message-circle.svg';
import { useNavigate } from 'react-router-dom';
import pageUlrConfig from '../../config/pageUrlConfig';
import postHeart from '../../api/postHeart.api';
import { useState } from 'react';

const formatDate = (stringDate) => {
  const date = new Date(stringDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { toggleHeartStatus, loading, error } = postHeart();
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(post.heartCount);

  const handleHeartClick = async (event) => {
    event.stopPropagation();
    const action = isHearted ? 'unheart' : 'heart';
    const isSuccess = await toggleHeartStatus(post._id, action);
    if (isSuccess) {
      setIsHearted(!isHearted);
      setHeartCount((prevCount) => (isHearted ? prevCount - 1 : prevCount + 1));
    }
  };

  // post.image 값을 ',' 기준으로 분리하고 첫 번째 이미지 URL 선택
  const firstImageUrl = post.image ? post.image.split(',')[0] : null;

  return (
    <Card
      onClick={() => {
        navigate(pageUlrConfig.feedDetailPage);
      }}
    >
      {firstImageUrl && <CardImage src={firstImageUrl} alt="" />}
      <CardContent>
        <h2>{post.content.postId}</h2>
        <p>{post.content.contents}</p>
        <Title>{post.content}</Title>
        <Author>@ {post.author.accountname}</Author>
        <Time>{formatDate(post.author.createdAt)}</Time>
        <IconsContainer>
          <CardBtn onClick={handleHeartClick} disabled={loading}>
            <img src={isHearted ? heartFilled : heart} alt="" />
            <span>{heartCount}</span>
          </CardBtn>
          <CardBtn>
            <img src={comment} alt="" />
            <span>{post.comments.length}</span>
          </CardBtn>
        </IconsContainer>
      </CardContent>
    </Card>
  );
};

export default PostCard;

const Card = styled.li`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  position: relative;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: 162px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #dbdbdb;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.span`
  display: block;
  color: #767676;
  font-size: 12px;
  margin: 8px 0;
`;

const Time = styled.time`
  display: block;
  color: #767676;
  font-size: 10px;
`;

const IconsContainer = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const CardBtn = styled.button`
  display: flex;
  gap: 4px;

  color: #767676;
  font-size: 12px;
  line-height: 20px;
`;
