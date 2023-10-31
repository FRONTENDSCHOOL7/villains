import { css } from 'styled-components';

const swiperStyles = css`
  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
    color: #3c58c1;
    background-color: #fff;
    border-radius: 50%;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
    opacity: 0;
    transition: opacity 0.3s;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 14px;
  }

  // hover 상태에서는 화살표를 보이게 합니다.
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
    }

    .swiper-button-disabled {
      opacity: 0.4;
    }
  }

  .swiper-pagination-bullet-active {
    background: #3c58c1;
  }
`;

export default swiperStyles;
