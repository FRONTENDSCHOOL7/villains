import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import imageBigIcon from '../../assets/image-big-icon.svg';

const ImagePreview = ({ imageUrls }) => {
  if (!imageUrls.length) {
    return (
      <ImagePreviewCont bg={imageBigIcon}>
        <PreviewSpan>
          오른쪽 하단 버튼을 눌러
          <br />
          이미지를 추가해보세요.
        </PreviewSpan>
      </ImagePreviewCont>
    );
  }

  if (imageUrls.length === 1) {
    return <StyledImage src={imageUrls[0]} alt="" />;
  }

  return (
    <Swiper spaceBetween={10} slidesPerView={1.2} pagination={{ clickable: true }}>
      {imageUrls.map((url, idx) => (
        <SwiperSlide key={idx}>
          <StyledImage src={url} alt={`Selected Preview ${idx}`} />
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

const StyledImage = styled.img`
  width: 100%;
  height: 204px;
  margin-bottom: 30px;
  object-fit: fill;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
`;