import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import imageBigIcon from '../../assets/img/image-big-icon.svg';
import deleteIcon from '../../assets/img/delete-icon.svg';

const ImagePreview = ({ imageUrls, onDeleteImage }) => {
  if (!imageUrls.length) {
    return (
      <ImagePreviewCont>
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
        <StyledImage src={imageUrls[0]} alt="" />
        <DeleteButton onClick={() => onDeleteImage(0)} />
      </ImageWrapper>
    );
  }

  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} pagination={{ clickable: true }}>
      {imageUrls.map((url, idx) => (
        <SwiperSlide key={idx}>
          <ImageWrapper>
            <StyledImage src={url} alt="" />
            <DeleteButton aria-label="이미지 삭제 버튼" type="button" onClick={() => onDeleteImage(idx)} />
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
  background: #f4f4f4 url(${imageBigIcon}) no-repeat center 50px;
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
  background: url(${deleteIcon});
  width: 22px;
  height: 22px;
`;
