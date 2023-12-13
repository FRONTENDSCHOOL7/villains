import { React, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import client from '../../config/api.config';
import pageUrlConfig from '../../config/pageUrlConfig';

import PageTemplate from '../../components/layout/PageTemplate';
import SearchSub from '../../components/input/SearchSub';
import { Input, Label } from '../../components/input/Input.style';
import FloatingButton from '../../components/button/FloatingButton.style';

import goodsQueryStartAtom from '../../atoms/goodsQueryStartAtom';
import goodsQueryEndAtom from '../../atoms/goodsQueryEndAtom';
import { headerBtnStateAtom, headerBtnOptionsAtom } from '../../atoms/headerBtnStateAtom';
import userAtom from '../../atoms/userAtom';
import ImageIcon from '../../components/ImageIcon';
import ImageBigIcon from '../../assets/img/image-big-icon.svg';

import updateProduct from '../../api/update/updateProduct.api';

import postImage from '../../api/post/postImage.api';

const GoodsWritePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const user = useRecoilValue(userAtom);
  const product = useLocation().state;
  const [headerBtnState, setHeaderBtnState] = useRecoilState(headerBtnStateAtom);
  const [headerBtnOptions, setHeaderBtnOptions] = useRecoilState(headerBtnOptionsAtom);
  // 수정 페이지
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, []);

  const navigate = useNavigate();
  // react-hook-form
  const {
    register,
    watch,
    formState: { isSubmitted, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      price: product ? product.price : '',
      info: product ? JSON.parse(product.link).itemInfo : '',
    },
  });
  const startSubway = useRecoilValue(goodsQueryStartAtom);
  const endSubway = useRecoilValue(goodsQueryEndAtom);
  const price = watch('price');
  const info = watch('info');

  const [image, setImage] = useState({
    file: '',
    url: product ? product.itemImage : '',
  });

  let inputRef;

  const handleSaveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        file: e.target.files[0],
        url: fileReader.result,
      });
    };
  };

  const handleFloatBtn = (e) => {
    e.preventDefault();
    inputRef.click();
  };

  useEffect(() => {
    if (
      errors.price ||
      startSubway === '' ||
      info === '' ||
      endSubway === '' ||
      price === '' ||
      image.url === ''
    ) {
      setHeaderBtnState(true);
    } else {
      setHeaderBtnState(false);
    }
    const adminToken = JSON.parse(localStorage.getItem('admin')).token;
    const linkData = JSON.stringify({
      accountname: user.accountname,
      itemInfo: info,
      state: '요청중',
    });
    if (isEditMode) {
      setHeaderBtnOptions({
        label: '저장하기',
        callback: async () => {
          const urls = image.file ? await postImage(image.file) : image.url;
          const result = await updateProduct(
            startSubway + '~' + endSubway,
            parseInt(price),
            linkData,
            urls,
            id,
          );
          if (result) {
            const goodsDetailUrl = `${pageUrlConfig.goodsPage}/${result.id}`;
            navigate(goodsDetailUrl);
          }
        },
      });
    } else {
      setHeaderBtnOptions({
        label: '저장하기',
        callback: async () => {
          const urls = image.file ? await postImage(image.file) : image.url;
          try {
            const response = await client.post(
              '/product',
              {
                product: {
                  itemName: startSubway + '~' + endSubway,
                  price: parseInt(price),
                  link: linkData,
                  itemImage: urls,
                },
              },
              client.BothType(adminToken),
            );
            navigate(pageUrlConfig.goodsPage);
          } catch (error) {
            console.log(error);
          }
        },
      });
    }
  }, [image, startSubway, endSubway, info, price]);

  const handleGoBackBtn = () => {
    navigate(pageUrlConfig.goodsPage);
  };

  return (
    <PageTemplate>
      <Form>
        <PreviewArea>
          {image.url !== '' ? (
            <Previewimg src={image.url} alt="이미지" />
          ) : (
            <>
              <img src={ImageBigIcon} alt="큰 아이콘" />
              <p>
                오른쪽 하단 버튼을 눌러
                <br />
                이미지를 추가해주세요.
              </p>
            </>
          )}
          <CustomFloatingBtn img={ImageIcon} onClick={handleFloatBtn}></CustomFloatingBtn>
        </PreviewArea>
        <ImgInput
          type="file"
          accept="image/*"
          onChange={handleSaveImage}
          onClick={(e) => (e.target.value = null)}
          ref={(refParam) => (inputRef = refParam)}
        />
        <SearchInput>
          <SearchSub
            type="text"
            which={'start'}
            labelText={'출발역'}
            placeholder={'2~15자 이내여야 합니다.'}
            value={isEditMode ? '' : product?.itemName?.split('~')[0]}
          />
        </SearchInput>
        <SearchInput>
          <SearchSub
            type="text"
            which={'end'}
            labelText={'도착역'}
            placeholder={'2~15자 이내여야합니다.'}
            value={isEditMode ? '' : product?.itemName?.split('~')[1]}
          />
        </SearchInput>
        <Label htmlFor="price">가격</Label>
        <Input
          name="price"
          id="price"
          type="text"
          placeholder="숫자만 입력 가능합니다."
          aria-invalid={isSubmitted ? (errors.price ? 'true' : 'false') : undefined}
          {...register('price', {
            pattern: {
              value: /^\d+$/, // 정수만 허용
              message: '*정수만 입력하세요.',
            },
          })}
        />
        {errors.price && <Warn>{errors.price.message}</Warn>}
        <Label htmlFor="info">택배 정보</Label>
        <InfoArea
          name="info"
          id="info"
          type="text"
          placeholder="택배 정보를 입력해주세요."
          aria-invalid={isSubmitted ? (info ? 'false' : 'true') : undefined}
          {...register('info')}
        />
      </Form>
    </PageTemplate>
  );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 34px 34px 34px;
`;
const SearchInput = styled.div``;
const InfoArea = styled.textarea`
  margin-top: 10px;
  height: 64px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  resize: none;
  &:focus {
    border: 1px solid #3c58c1;
  }
  &:focus-visible {
    outline: 1px solid #3c58c1;
  }
`;
const ImgInput = styled.input`
  display: none;
`;
const PreviewArea = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c4c4c4;
  font-size: 12px;
  line-height: normal;
  margin: 50px 0 20px 0;
  width: 100%;
  height: 204px;
  border-radius: 10px;
  border: 0.5px solid #dbdbdb;
  background-color: #f2f2f2;
  position: relative;
`;
const Previewimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CustomFloatingBtn = styled(FloatingButton)`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;
const Warn = styled.strong`
  color: #eb5757;
  font-size: 12px;
`;
export default GoodsWritePage;
