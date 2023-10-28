import PageTemplate from '../components/PageTemplate';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import FloatingButton from '../components/FloatingButton.style';
import imageIcon from '../assets/img/image-icon.svg';
import useGeoLocation from '../hooks/useGeoLocation';
import uploadPost from '../api/uploadPost.api';
import postImages from '../api/postImages.api';
import ImagePreview from '../components/feed/ImagePreview';

const FeedWritePage = () => {
  const textarea = useRef();
  const fileInputRef = useRef();

  const [content, setContent] = useState('');
  const [imagesData, setImagesData] = useState({
    urls: [],
    files: [],
  });
  const { location } = useGeoLocation();

  const handleContentChange = (event) => {
    setContent(event.target.value);
    handleResizeHeight();
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

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

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
      // uploadPost의 리턴값이 true일 때, 해당 게시글의 상세 페이지로 이동하는 로직 추가
    }
  };

  return (
    <PageTemplate>
      {/* 임시 헤더입니다. */}
      <Header>
        뒤로가기
        <UploadBtn onClick={handleSubmitPost}>업로드</UploadBtn>
      </Header>
      <FeedWriteForm>
        <form>
          <ImagePreview imageUrls={imagesData.urls} onDeleteImage={handleDeleteImage} />
          <Textarea
            ref={textarea}
            rows="1"
            placeholder="게시글 입력하기..."
            onChange={handleContentChange}
          ></Textarea>

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

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  resize: none;

  &::placeholder {
    color: #c4c4c4;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
