import PageTemplate from '../components/PageTemplate';
import styled from 'styled-components';
import { useRef } from 'react';
import imageBigIcon from '../assets/image-big-icon.svg';
import FloatingButton from '../components/FloatingButton.style';

const FeedWritePage = () => {
  const textarea = useRef();

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  return (
    <PageTemplate>
      {/* 임시 헤더입니다. */}
      <Header>
        뒤로가기
        <button>업로드</button>
      </Header>
      <FeedWriteForm>
        <form>
          <ImagePreview bg={imageBigIcon}>
            <PreviewSpan>
              오른쪽 하단 버튼을 눌러
              <br />
              이미지를 추가해보세요.
            </PreviewSpan>
          </ImagePreview>
          <Textarea
            ref={textarea}
            rows="1"
            placeholder="게시글 입력하기..."
            onChange={handleResizeHeight}
          ></Textarea>

          <FloatingButton>
            <input type="file" name="" id="" />
          </FloatingButton>
        </form>
      </FeedWriteForm>
    </PageTemplate>
  );
};
export default FeedWritePage;

const Header = styled.header`
  width: 100%;
  height: 48px;
  background-color: #dbdbdb;
`;

const FeedWriteForm = styled.section`
  width: 100%;
  padding: 30px 32px;
`;

const ImagePreview = styled.div`
  width: 326px;
  height: 204px;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
  background: #f4f4f4 url(${(props) => props.bg}) no-repeat center 50px;
  margin-bottom: 30px;

  color: #c4c4c4;
  text-align: center;
  font-size: 12px;
  line-height: 15px;
`;

const PreviewSpan = styled.span`
  position: relative;
  top: 124px;
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

const ImageInsertBtn = styled.input;
