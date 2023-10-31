import styled from 'styled-components';
import { useState } from 'react';
import postHeart from '../../api/postHeart.api';
import useFormatDate from '../../hooks/useFormatDate';
import IconActionButton from './IconActionButton';
import profileImage from '../../assets/img/basic-profile.svg';
import heart from '../../assets/img/heart.svg';
import heartFilled from '../../assets/img/heart-filled.svg';
import comment from '../../assets/img/message-circle.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FeedDetail = ({ post }) => {
  const createdDate = useFormatDate(post.createdAt);
  const { toggleHeartStatus, loading, error } = postHeart();
  const [isHearted, setIsHearted] = useState(post.hearted);
  const [heartCount, setHeartCount] = useState(post.heartCount);
  const postImage = post.image.split(',');
  console.log(postImage);

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
        {postImage[0] && (
          <SwiperWrapper>
            <Swiper
              navigation={true}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Pagination, Navigation]}
            >
              {postImage.map((imgUrl, index) => (
                <SwiperSlide key={index}>
                  <Image src={imgUrl} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
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
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const PostContainer = styled.div`
  width: 100%; // 필요에 따라 수정 가능합니다.
  box-sizing: border-box;
`;

const UserHeader = styled.div`
  width: 100%;
  padding: 0 20px;
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

const Image = styled.img`
  width: calc(100% - 48px);
  height: 260px;
  border-radius: 10px;
`;

const ContentText = styled.p`
  width: 100%;
  padding: 0 36px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const IconsContainer = styled.div`
  padding: 0 36px;
  display: flex;
  gap: 8px;
`;

const SwiperWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
  margin-bottom: 20px;
  overflow: visible;
  position: relative;
  text-align: center;

  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
    color: #000;
    background-color: #fff;
    border-radius: 50%;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
    opacity: 0;
    transition: opacity 0.3s;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 14px;
  }

  // hover 상태에서는 화살표를 보이게 합니다.
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
    }

    .swiper-button-disabled {
      opacity: 0.4;
    }
  }

  .swiper-pagination-bullet-active {
    background: #3c58c1;
  }
`;
