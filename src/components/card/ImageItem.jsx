import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

/*
? 이미지의 개수에 따라서 컴포넌트가 달라진다. 하나의 컴포넌트로 관리할 수 없을까?
-> discussion open: https://github.com/FRONTENDSCHOOL7/villains/discussions/157
*/ 

//게시글 쓰기에서 이미지가 없을 경우
const DefaultImage = () => {
    return(
        <ImagePreviewCont>
            <PreviewSpan>
            오른쪽 하단 버튼을 눌러
            <br />
            이미지를 추가해보세요.
            </PreviewSpan>
        </ImagePreviewCont>
    )
}

//이미지가 하나일 경우
const SingleImage = ({url, onClick}) => {
    return(
        <ImageWrapper>
        <StyledImage src={url} alt="" />
        <DeleteButton aria-label="이미지 삭제 버튼" type="button" onClick={onClick} />
      </ImageWrapper>
    )
}

/**
 * 
 * {multi && <SwiperWrapper />}
 * <image />
 * 
 * multi ? <Swiper>{children}<Swiepr> : children
 */

//이미지가 여러개인 경우
const MultiImage = ({imageUrls, onClick}) => {
    return (
        <Swiper spaceBetween={10} slidesPerView={1.2} pagination={{ clickable: true }}>
        {imageUrls.map((url, idx) => (
            <SwiperSlide key={idx}>
                <SingleImage url={url} onClick={onClick} idx={idx} />
            </SwiperSlide>
        ))}
        </Swiper>
    )
}

const Image = {
    Default: DefaultImage,
    Single: SingleImage,
    Multi: MultiImage
}

export default Image;

const ImagePreviewCont = styled.div`
  width: 100%;
  height: 204px;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
  background: #f4f4f4 ;
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
  width: 22px;
  height: 22px;
`;
