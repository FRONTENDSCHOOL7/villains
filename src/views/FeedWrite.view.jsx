import PageTemplate from '../components/PageTemplate';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../components/FloatingButton.style';
import imageIcon from '../assets/img/image-icon.svg';
import useGeoLocation from '../hooks/useGeoLocation';
import uploadPost from '../api/uploadPost.api';
import postImages from '../api/postImages.api';
import ImagePreview from '../components/feed/ImagePreview';
import arrowIcon from '../assets/img/icon-arrow-left.svg';
import useBlockToBack from '../hooks/useBlockToBack';
import pageUrlConfig from '../config/pageUrlConfig';
import ResizingTextarea from '../components/feed/ResizingTextarea';

const FeedWritePage = () => {
  const fileInputRef = useRef();

  const [content, setContent] = useState('');
  const [imagesData, setImagesData] = useState({
    urls: [],
    files: [],
  });
  const { location } = useGeoLocation();
  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (imagesData.urls.length + files.length > 3) {
      alert('최대 3개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    // 이미지 미리보기를 위해 FileReader API로 파일 읽기
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((urls) => {
      setImagesData((prevData) => ({
        urls: [...prevData.urls, ...urls],
        files: [...prevData.files, ...files],
      }));
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // 프리뷰에 있는 이미지 삭제
  const handleDeleteImage = (index) => {
    setImagesData((prevData) => {
      const newUrls = [...prevData.urls];
      const newFiles = [...prevData.files];

      newUrls.splice(index, 1);
      newFiles.splice(index, 1);

      return {
        urls: newUrls,
        files: newFiles,
      };
    });
  };

  const handleSubmitPost = async (event) => {
    const urls = await postImages(imagesData.files);
    const result = await uploadPost(content, urls, location);

    if (result) {
      // 게시글 업로드가 성공하면, 해당 게시글의 상세 페이지로 이동
      console.log(result);
      const feedDetailUrl = `${pageUrlConfig.feedPage}/${result.id}`;
      navigate(feedDetailUrl);
    }
  };

  // 입력내용이 있을 시 뒤로가기 제한
  const handleBack = useBlockToBack(content, navigate, pageUrlConfig.feedPage);

  return (
    <PageTemplate>
      {/* 임시 헤더입니다. */}
      <Header>
        <button type="button" onClick={handleBack}>
          <img src={arrowIcon} alt="뒤로가기 버튼" />
        </button>
        <UploadBtn onClick={handleSubmitPost} disabled={!content}>
          업로드
        </UploadBtn>
      </Header>
      <FeedWriteForm>
        <form>
          <ImagePreview imageUrls={imagesData.urls} onDeleteImage={handleDeleteImage} />
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

const Header = styled.header`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background-color: #dbdbdb;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UploadBtn = styled.button`
  width: 90px;
  height: 32px;
  border-radius: 32px;
  color: #fff;

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
