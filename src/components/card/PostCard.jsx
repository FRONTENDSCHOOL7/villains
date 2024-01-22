import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import pageUrlConfig from '../../config/pageUrlConfig';
import postHeart from '../../api/post/postHeart.api';
import useFormatDate from '../../hooks/useFormatDate';
import { IconLabelBtn } from '../button/Buttons';

import HeartIcon from '../icon/HeartIcon';
import MessageIcon from '../icon/MessageIcon';

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

  const handleFeedDetailNav = () => {
    const feedDetailUrl = `${pageUrlConfig.feedPage}/${post._id}`;
    navigate(feedDetailUrl);
  };

  const createdDate = useFormatDate(post.createdAt);

  return (
    <Card onClick={handleFeedDetailNav}>
      {firstImageUrl && <CardImage src={firstImageUrl} alt="" />}
      <CardContent>
        <Title>{post.content.contents}</Title>
        <Author>@ {post.author.accountname}</Author>
        <Time>{createdDate}</Time>
        <IconsContainer>
          <IconLabelBtn
            count={heartCount}
            onClick={handleHeartClick}
            disabled={loading}
          >
          {isHearted ? <HeartIcon filled={true}/> : <HeartIcon filled={false}/>}</IconLabelBtn>
          <IconLabelBtn count={post.comments.length} ><MessageIcon/> </IconLabelBtn>
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
