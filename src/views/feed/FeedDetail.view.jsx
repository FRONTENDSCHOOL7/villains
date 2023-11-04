import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getPostDetail from '../../api/getPostDetail.api';
import postHeart from '../../api/postHeart.api';
import getComments from '../../api/getComments.api';
import postComments from '../../api/postComments.api';
import useFormatDate from '../../hooks/useFormatDate';
import PageTemplate from '../../components/PageTemplate';
import pageUrlConfig from '../../config/pageUrlConfig';
import Comment from '../../components/feed/Comment';
import CommentForm from '../../components/feed/CommentForm';
import { IconLabelBtn } from '../../components/Buttons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import swiperStyles from '../../style/swiperStyle';
import profileImage from '../assets/img/basic-profile.svg';
import heart from '../assets/img/heart.svg';
import heartFilled from '../assets/img/heart-filled.svg';
import commentIcon from '../assets/img/message-circle.svg';
import verticalIcon from '../assets/img/icon-more-vertical.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import useBottomSheetOptions from '../../hooks/useBottomSheetOptions';
import userAtom from '../../atoms/userAtom';
import { useMutation } from '@tanstack/react-query';
import deletePostQuery from '../../api/deletePost.api';
import postReportQuery from '../../api/postReport.api';

const usePostActions = (id, token, navigate) => {
  const deleteMutation = useMutation(deletePostQuery(id, token));
  const reportMutation = useMutation(postReportQuery(id, token));

  const postEdit = () => {
    navigate(`/feed/edit/${id}`);
  };

  const postDelete = () => {
    deleteMutation.mutate(
      { id, token },
      {
        onSuccess: () => navigate(pageUrlConfig.feedPage),
        onError: () => alert('게시글 삭제에 실패했습니다.'),
      },
    );
  };

  const postReport = () => {
    reportMutation.mutate(
      { id, token },
      {
        onSuccess: () => navigate(pageUrlConfig.feedPage),
        onError: () => alert('게시글 신고에 실패했습니다.'),
      },
    );
  };

  return { postEdit, postDelete, postReport };
};

const FeedDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [isHearted, setIsHearted] = useState(post?.hearted);
  const [heartCount, setHeartCount] = useState(post?.heartCount);

  const { fetchPost, loading, error } = getPostDetail();
  const { fetchComments } = getComments();
  const { uploadComment } = postComments();
  const { toggleHeartStatus } = postHeart();
  const navigate = useNavigate();

  const setIsVisible = useSetRecoilState(bottomSheetStateAtom);
  const setOptions = useSetRecoilState(bottomSheetOptions);

  const createdDate = useFormatDate(post?.createdAt);
  const postImage = post?.image.split(',');

  const user = useRecoilValue(userAtom);

  const { postEdit, postDelete, postReport } = usePostActions(id, user.token, navigate);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPost(id);
      if (!result) {
        return navigate(pageUrlConfig.feedPage, { replace: true });
      } else {
        setPost(result);
        // post 요청이 성공하면 코멘트리스트 요청
        const resultComment = await fetchComments(id);
        if (resultComment) {
          setCommentsList(resultComment.reverse());
        }
      }
    };
    fetchData();
  }, [id, navigate]);

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

  const removeCommentFromList = (commentId) => {
    setCommentsList((currentList) => currentList.filter((comment) => comment.id !== commentId));
  };

  const toggleBottomSheetShow = () => setIsVisible((prev) => !prev);

  const currentAccountname = user.accountname;
  const authorAccountname = post?.author.accountname;

  // 바텀시트 옵션 생성
  const options = useBottomSheetOptions({
    currentAccountname,
    authorAccountname,
    postEdit: () => confirmAction('게시글을 수정할까요?', postEdit),
    postDelete: () => confirmAction('게시글을 삭제할까요?', postDelete),
    postReport: () => confirmAction('게시글을 신고할까요?', postReport),
    type: 'post',
  });

  const handleBottomSheetShow = (event) => {
    event.stopPropagation();
    setOptions(options);
    toggleBottomSheetShow();
  };

  // TODO : 확인창 모달로 수정 필요
  const confirmAction = (message, callback) => {
    if (confirm(message)) {
      callback();
    }
    toggleBottomSheetShow();
  };

  if (!post) {
    // TODO : 스켈레톤 ui로 대체
    return null;
  }

  return (
    <PageTemplate showNavMenu={false}>
      <PostWrapper>
        <PostContainer>
          <PostMoreBtn aria-label="댓글 삭제/신고 버튼" onClick={handleBottomSheetShow} />
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
            <IconLabelBtn icon={commentIcon} count={commentsList.length} alt="코멘트 버튼" />
          </IconsContainer>
        </PostContainer>
      </PostWrapper>

      {/* 댓글 리스트 */}
      {commentsList && (
        <CommentContaier>
          <ul>
            {commentsList.map((comment, idx) => (
              <Comment key={idx} comment={comment} id={id} removeCommentFromList={removeCommentFromList} />
            ))}
          </ul>
        </CommentContaier>
      )}

      {/* 댓글 작성 폼 */}
      <CommentForm
        id={id}
        uploadComment={uploadComment}
        setCommentsList={setCommentsList}
        profileImage={profileImage}
      />
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

// TODO : header에 들어가도록 수정 필요
// 현재 위치 고정 안됨
const PostMoreBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  width: 40px;
  height: 24px;
  background: url(${verticalIcon}) no-repeat center right;
  background-size: 20px 20px;

  z-index: 100;
`;
