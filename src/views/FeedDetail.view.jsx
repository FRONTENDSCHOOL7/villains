import { useNavigate, useParams } from 'react-router';
import getPostDetail from '../api/getPostDetail.api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import postHeart from '../api/postHeart.api';
import useFormatDate from '../hooks/useFormatDate';
import profileImage from '../assets/img/basic-profile.svg';
import heart from '../assets/img/heart.svg';
import heartFilled from '../assets/img/heart-filled.svg';
import comment from '../assets/img/message-circle.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import swiperStyles from '../style/swiperStyle';
import PageTemplate from '../components/PageTemplate';
import pageUrlConfig from '../config/pageUrlConfig';
import { IconLabelBtn } from '../components/Buttons';

const FeedDetailPage = () => {
  const { postId } = useParams();
  const { fetchPost, loading, error } = getPostDetail();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const createdDate = useFormatDate(post?.createdAt);
  const { toggleHeartStatus } = postHeart();
  const [isHearted, setIsHearted] = useState(post?.hearted);
  const [heartCount, setHeartCount] = useState(post?.heartCount);
  const postImage = post?.image.split(',');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPost(postId);
      if (!result) {
        return navigate(pageUrlConfig.feedPage);
      } else {
        setPost(result);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    if (post) {
      setIsHearted(post.hearted);
      setHeartCount(post.heartCount);
    }
  }, [post]);

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
    <PageTemplate>
      <Header>{postId} 상세페이지 (임시 헤더)</Header>
      {post && (
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
              <IconLabelBtn
                icon={isHearted ? heartFilled : heart}
                count={heartCount}
                onClick={handleHeartClick}
                alt="좋아요 버튼"
              />
              <IconLabelBtn icon={comment} count={post.commentCount} alt="코멘트 버튼" />
            </IconsContainer>
          </PostContainer>
        </PostWrapper>
      )}
    </PageTemplate>
  );
};

export default FeedDetailPage;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;

const PostWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const PostContainer = styled.div`
  width: 100%;
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
  background-color: #c4c4c4;
`;

const UserInfo = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
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
  ${swiperStyles}

  width: 100%;
  padding: 0 12px;
  margin-bottom: 20px;
  overflow: visible;
  position: relative;
  text-align: center;
`;
