import styled from 'styled-components';
import { useState } from 'react';
import postHeart from '../../api/postHeart.api';
import useFormatDate from '../../hooks/useFormatDate';
import IconActionButton from './IconActionButton';
import profileImage from '../../assets/img/basic-profile.svg';
import heart from '../../assets/img/heart.svg';
import heartFilled from '../../assets/img/heart-filled.svg';
import comment from '../../assets/img/message-circle.svg';

const FeedDetail = ({ post }) => {
  const createdDate = useFormatDate(post.createdAt);
  const { toggleHeartStatus, loading, error } = postHeart();
  const [isHearted, setIsHearted] = useState(post.hearted);
  const [heartCount, setHeartCount] = useState(post.heartCount);

  const handleHeartClick = async (event) => {
    event.stopPropagation();
    const action = isHearted ? 'unheart' : 'heart';
    const isSuccess = await toggleHeartStatus(post.id, action);
    if (isSuccess) {
      setIsHearted(!isHearted);
      setHeartCount((prevCount) => (isHearted ? prevCount - 1 : prevCount + 1));
    }
  };

  console.log(post);
  return (
    <PostWrapper>
      <PostContainer>
        <UserHeader>
          <ProfileImage>
            {/* 프로필 기본이미지 수정 필요 */}
            {/* <img src={post.author.image} alt="" /> */}
            <img src={profileImage} alt="" />
          </ProfileImage>
          <UserInfo>
            <UserName>{post.author.username}</UserName>
            <Accountname>@ {post.author.accountname}</Accountname>
          </UserInfo>
          <DateText>{createdDate}</DateText>
        </UserHeader>
        {post.image && (
          <ImageContainer>
            <Image src={post.imageUrl} alt="post" />
          </ImageContainer>
        )}
        <ContentText>{JSON.parse(post.content).contents}</ContentText>
        <IconsContainer>
          <IconActionButton
            icon={isHearted ? heartFilled : heart}
            count={heartCount}
            onClick={handleHeartClick}
            disabled={loading}
          />
          <IconActionButton icon={comment} count={post.comments.length} />
        </IconsContainer>
      </PostContainer>
    </PostWrapper>
  );
};

export default FeedDetail;

const PostWrapper = styled.div`
  width: 100%; // 필요에 따라 수정 가능합니다.
  padding: 20px 20px;
  border-bottom: 1px solid #ccc;
`;

const PostContainer = styled.div`
  width: 100%; // 필요에 따라 수정 가능합니다.
  box-sizing: border-box;
`;

const UserHeader = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #c4c4c4; // 실제 이미지로 교체 가능합니다.
`;

const UserInfo = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  /* margin-bottom: 6px; */
`;

const UserName = styled.span`
  display: block;
`;

const Accountname = styled.span`
  display: block;
  color: #767676;
  font-size: 12px;
`;

const DateText = styled(Accountname)`
  font-size: 10px;
  align-self: flex-end;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const ContentText = styled.p`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const IconsContainer = styled.div`
  padding: 0 16px;
  display: flex;
  gap: 8px;
`;
