import { useNavigate, useParams } from 'react-router';
import getPostDetail from '../api/getPostDetail.api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import postHeart from '../api/postHeart.api';
import useFormatDate from '../hooks/useFormatDate';
import profileImage from '../assets/img/basic-profile.svg';
import heart from '../assets/img/heart.svg';
import heartFilled from '../assets/img/heart-filled.svg';
import commentIcon from '../assets/img/message-circle.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import swiperStyles from '../style/swiperStyle';
import PageTemplate from '../components/PageTemplate';
import pageUrlConfig from '../config/pageUrlConfig';
import { IconLabelBtn } from '../components/Buttons';
import getComments from '../api/getComments.api';
import postComments from '../api/postComments.api';
import Comment from '../components/feed/Comment';
import ResizingTextarea from '../components/feed/ResizingTextarea';
import BottomSheet from '../components/BottomSheet';
import verticalIcon from '../assets/img/icon-more-vertical.svg';

const FeedDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [isHearted, setIsHearted] = useState(post?.hearted);
  const [inputComment, setInputComment] = useState('');
  const [heartCount, setHeartCount] = useState(post?.heartCount);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { fetchPost, loading, error } = getPostDetail();
  const { fetchComments } = getComments();
  const { uploadComment } = postComments();
  const { toggleHeartStatus } = postHeart();
  const navigate = useNavigate();
  const createdDate = useFormatDate(post?.createdAt);

  const postImage = post?.image.split(',');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPost(postId);
      if (!result) {
        return navigate(pageUrlConfig.feedPage);
      } else {
        setPost(result);

        // post 요청이 성공하면 코멘트리스트 요청
        const resultComment = await fetchComments(postId);
        if (resultComment) {
          setCommentsList(resultComment.reverse());
        }
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

  const handlePostComments = async (event) => {
    event.preventDefault();

    const newComment = await uploadComment(postId, inputComment);

    if (newComment) {
      // 새 댓글을 포함하도록 commentsList 상태를 업데이트
      setCommentsList((prevCommentsList) => [...prevCommentsList, newComment]);

      setInputComment('');
    }
  };

  const handleCommentChange = (event) => {
    setInputComment(event.target.value);
  };

  console.log(commentsList)
  const removeCommentFromList = (commentId) => {
    setCommentsList((currentList) => currentList.filter((comment) => comment.id !== commentId));
  };

  return (
    <PageTemplate showNavMenu={false}>
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
            {/* <PostMoreBtn aria-label="댓글 삭제/신고 버튼" onClick={handleBottomSheetShow} /> */}
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
              <IconLabelBtn icon={commentIcon} count={commentsList.length} alt="코멘트 버튼" />
            </IconsContainer>
          </PostContainer>
        </PostWrapper>
      )}

      {/* 댓글 리스트 */}
      {commentsList && (
        <CommentContaier>
          <ul>
            {commentsList.map((comment, idx) => (
              <Comment
                key={idx}
                comment={comment}
                postId={postId}
                removeCommentFromList={removeCommentFromList}
              />
            ))}
          </ul>
        </CommentContaier>
      )}

      {/* 댓글 작성 */}
      {post && (
        <CommentForm onSubmit={handlePostComments}>
          {/* 프로필 기본이미지 수정 필요 */}
          <CommentImage src={profileImage} alt="" />
          <ResizingTextarea
            rows="1"
            placeholder="댓글 입력하기..."
            onChange={handleCommentChange}
            value={inputComment}
          />
          <CommentBtn disabled={!inputComment}>게시</CommentBtn>
        </CommentForm>
      )}
    </PageTemplate>
  );
};

export default FeedDetailPage;

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

const CommentContaier = styled.section`
  padding: 20px 16px 60px;
`;

const CommentForm = styled.form`
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

// // 수정 필요
// const PostMoreBtn = styled.button`
//   position: absolute;
//   top: 14px;
//   right: 0;

//   width: 40px;
//   height: 20px;
//   background: url(${verticalIcon}) no-repeat center right;
//   background-size: 18px 18px;

//   z-index: 100;
// `;
