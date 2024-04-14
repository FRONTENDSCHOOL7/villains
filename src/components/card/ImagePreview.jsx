import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ImageIcon from '../../components/icon/ImageIcon';
import DeleteIcon from '../../components/icon/DeleteIcon';

const ImagePreview = ({ imageUrls, onDeleteImage }) => {
  if (!imageUrls.length) {
    return (
      <ImagePreviewCont>
        {/* TODO : 아이콘 사이즈 확인 필요 */}
        <ImageIcon />
        <PreviewSpan>
          오른쪽 하단 버튼을 눌러
          <br />
          이미지를 추가해보세요.
        </PreviewSpan>
      </ImagePreviewCont>
    );
  }

  if (imageUrls.length === 1) {
    return (
      <ImageWrapper>
        <StyledImage src={imageUrls[0].url} alt="" />
        <DeleteButton aria-label="이미지 삭제 버튼" type="button" onClick={() => onDeleteImage(0)}>
          <DeleteIcon />
        </DeleteButton>
      </ImageWrapper>
    );
  }

  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} pagination={{ clickable: true }}>
      {imageUrls.map((imageData, idx) => (
        <SwiperSlide key={idx}>
          <ImageWrapper>
            <StyledImage src={imageData.url} alt="" />
            <DeleteButton aria-label="이미지 삭제 버튼" type="button" onClick={() => onDeleteImage(idx)}>
              <DeleteIcon />
            </DeleteButton>
          </ImageWrapper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagePreview;

const ImagePreviewCont = styled.div`
  width: 100%;
  height: 204px;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
  background: #f4f4f4;
  margin-bottom: 30px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;

  color: #c4c4c4;
  text-align: center;
  font-size: 12px;
  line-height: 15px;
`;

const PreviewSpan = styled.span`
  margin-top: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 204px;
  margin-bottom: 28px;
  object-fit: fill;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;

  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
