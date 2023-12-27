import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import pageUrlConfig from '../../config/pageUrlConfig';
import useGeoLocation from '../../hooks/useGeoLocation';
import useBlockToBack from '../../hooks/useBlockToBack';
import userAtom from '../../atoms/userAtom';

import uploadPost from '../../api/post/postUploadPost.api';
import postImage from '../../api/post/postImage.api';
import getPostDetail from '../../api/get/getPostDetail.api';
import putPostEdit from '../../api/update/updatePostEdit.api';

import PageTemplate from '../../components/layout/PageTemplate';
import FloatingButton from '../../components/button/FloatingButton.style';
import ImagePreview from '../../components/card/ImagePreview';
import ResizingTextarea from '../../components/textarea/ResizingTextarea';

import imageIcon from '../../assets/img/image-icon.svg';
import arrowIcon from '../../assets/img/icon-arrow-left.svg';
import userPostAtom from '../../atoms/userPostAtom';

const FeedWritePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();

  const fileInputRef = useRef();

  const [content, setContent] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const { location } = useGeoLocation();
  const navigate = useNavigate();
  const token = useRecoilValue(userAtom).token;

  const { fetchPost, loading, error } = getPostDetail();

  const [userPosts, setUserPosts] = useRecoilState(userPostAtom);

  // params가 있다면 수정 모드로 변경
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPost(id);
        setContent(JSON.parse(result.content).contents);
        setImagesData(result.image ? result.image.split(',').map((url) => ({ url, isNew: false })) : []);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      setIsEditMode(true);
      fetchData();
    }
  }, [id, isEditMode]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);

    if (imagesData.length + files.length > 3) {
      alert('최대 3개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    for (const file of files) {
      try {
        const fileDataUrl = await readFileAsync(file);
        setImagesData((prevData) => [...prevData, { url: fileDataUrl, file: file, isNew: true }]);
        resetFileInput();
      } catch (error) {
        console.error('Error reading file:', file.name);
      }
    }
  };

  const uploadNewImages = async (newImages) => {
    const uploadPromises = newImages.map((image) => postImage(image.file));
    return await Promise.all(uploadPromises);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // 프리뷰에 있는 이미지 삭제
  const handleDeleteImage = (index) => {
    setImagesData((prevData) => prevData.filter((_, idx) => idx !== index));
    resetFileInput();
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    const newImagesFiles = imagesData.filter((image) => image.isNew);

    let newImagesUrls = [];
    if (newImagesFiles.length > 0) {
      newImagesUrls = await uploadNewImages(newImagesFiles);
    }

    const allImagesUrls = [
      ...imagesData.filter((image) => !image.isNew).map((image) => image.url),
      ...newImagesUrls,
    ];

    const postData = {
      post: {
        content: JSON.stringify({
          postId: 'villains',
          contents: content,
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
        }),
        image: allImagesUrls.join(','),
      },
    };

    if (isEditMode) {
      // 수정 API 요청
      const updateResult = await putPostEdit(id, postData, token);
      if (updateResult) {
        // 리코일 부분 작동하는지 확인 필요
        setUserPosts((prevPosts) => {
          const postIndex = prevPosts.indexOf((post) => post.id === id);
          if (postIndex !== -1) {
            const newPosts = [...prevPosts];
            newPosts[postIndex] = updateResult;
            return newPosts;
          }
          return prevPosts;
        });
        navigate(`${pageUrlConfig.feedPage}/${updateResult.id}`);
      } else {
        console.error('게시글 수정에 실패했습니다.');
      }
    } else {
      // 작성 API 요청
      // TODO : getUserPost → Recoil (feedWrite 에서도 적용 → 업로드버튼 누르면 리코일에도 push)
      const uploadResult = await uploadPost(postData);
      if (uploadResult) {
        setUserPosts((prevPosts) => [...prevPosts, uploadResult]);
        navigate(`${pageUrlConfig.feedPage}/${uploadResult.id}`);
      } else {
        console.error('게시글 업로드에 실패했습니다.');
      }
    }
    resetFileInput();
  };

  // 입력내용이 있을 시 뒤로가기 제한
  const handleBack = useBlockToBack(content, navigate, pageUrlConfig.feedPage);

  return (
    <PageTemplate>
      <UploadBtn onClick={handleSubmitPost} disabled={!content}>
        업로드
      </UploadBtn>

      <FeedWriteForm>
        <form>
          <ImagePreview imageUrls={imagesData} onDeleteImage={handleDeleteImage} />
          <ResizingTextarea
            rows="1"
            placeholder="게시글 입력하기..."
            onChange={handleContentChange}
            value={content}
          />

          <InsertImageBtn htmlFor="file">
            <FloatingButton img={imageIcon} type="button" onClick={triggerFileInput} />
          </InsertImageBtn>
          <InputFile
            ref={fileInputRef}
            type="file"
            id="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </form>
      </FeedWriteForm>
    </PageTemplate>
  );
};
export default FeedWritePage;

const UploadBtn = styled.button`
  width: 90px;
  height: 32px;
  border-radius: 32px;
  color: #fff;

  position: fixed;
  top: 8px;
  right: calc(50% - 206px + 16px);
  z-index: 100;

  &:disabled {
    background-color: #b1bce6;
    cursor: default;
  }

  &:enabled {
    background-color: #3c58c1;
  }
`;

const FeedWriteForm = styled.section`
  width: 100%;
  padding: 30px 32px;
`;

const InputFile = styled.input`
  display: none;
`;

const InsertImageBtn = styled.label`
  width: 50px;
  height: 50px;
  z-index: 10;
`;
