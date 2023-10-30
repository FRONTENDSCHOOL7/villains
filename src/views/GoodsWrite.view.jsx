import { React, useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import styled from 'styled-components';
import SearchSub from '../components/SearchSub';
import { Input, Label } from '../components/Input.style';
import BackArrow from '../assets/img/icon-arrow-left.svg';
import { BlueSmallBtn } from '../components/Buttons';
import { useForm } from 'react-hook-form';

const GoodsWritePage = () => {
  // react-hook-form
  const {
    register,
    watch,
    formState: { isSubmitted, errors },
  } = useForm({ mode: 'onChange' });
  const startSubway = watch('startSubway');
  const endSubway = watch('endSubway');
  const price = watch('price');
  const info = watch('info');
  //IsShowSearchBar는 첫 렌더 시에만 필요한 값이며, useState를 쓰면 안됩니다.
  //useState로 사용할 경우 상태가 변경되어 다시 렌더가 되면 또 값이 바뀌고 리렌더링 시키는 무한 렌더링 상태가 됩니다.
  let IsShowSearchBar = true;

  const handleSaveBtn = async () => {
    // try {
    //   const response = await client.post('/product', {
    //   })
    // }
    console.log(info);
    console.log(startSubway);
    console.log(endSubway);
    console.log(price);
  };

  return (
    <PageTemplate>
      <Header>
        <img src={BackArrow} alt="" />
        <BlueSmallBtn text={'저장하기'} onClick={handleSaveBtn}></BlueSmallBtn>
      </Header>
      <Form>
        <input type="file" />
        <SearchInput>
          {IsShowSearchBar && (
            <SearchSub
              type="text"
              which={'start'}
              labelText={'출발역'}
              placeholder={'2~15자 이내여야 합니다.'}
            />
          )}
        </SearchInput>
        <SearchInput>
          {IsShowSearchBar && (
            <SearchSub
              type="text"
              which={'end'}
              labelText={'도착역'}
              placeholder={'2~15자 이내여야합니다.'}
            />
          )}
        </SearchInput>
        <Label htmlFor="price">가격</Label>
        <Input
          name="price"
          id="price"
          type="number"
          placeholder="숫자만 입력 가능합니다."
          aria-invalid={isSubmitted ? (errors.price ? 'true' : 'false') : undefined}
          {...register('price', {
            pattern: {
              value: /^\d+$/, // 정수만 허용
              message: '*1 이상의 값을 입력하세요.',
            },
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}
        <Label htmlFor="info">택배 정보</Label>
        <InfoArea name="info" id="info" type="text" placeholder="택배 정보를 입력해주세요." />
      </Form>
    </PageTemplate>
  );
};
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px 8px 16px;
  border-bottom: 1px solid #dbdbdb;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 34px 0 34px;
`;
const SearchInput = styled.div``;
const InfoArea = styled.textarea`
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
export default GoodsWritePage;
