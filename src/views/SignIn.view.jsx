import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../config/pageUrlConfig';
import client from '../config/api.config';
import { useForm } from 'react-hook-form';

const SignInPage = () => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: 'onChange' });
  const userEmail = watch('email');
  const userPwd = watch('password');
  // 에러 메시지 저장 useState
  const [signInError, setSignInError] = useState('');
  // navigate
  const navigate = useNavigate();

  const signInFunc = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user/login', {
        user: {
          email: userEmail,
          password: userPwd,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem('accountname', response.data.user.accountname);
        localStorage.setItem('token', response.data.user.token);
        navigate(pageUrlConfig.homePage);
      }
      if (response.data.status === 422) setSignInError(response.data.message);
    } catch (error) {
      console.log(error.response.data);
      setSignInError(error.response.data);
    }
  };

  const goToSignUp = () => {
    navigate(pageUrlConfig.signUpPage);
  };

  return (
    <Main>
      <Title>로그인</Title>
      <FormField
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
        })}
      >
        <FormFieldTop>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            name="email"
            aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
            {...register('email', {
              required: '*이메일을 입력해주세요.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '*이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.email && <Warn>{errors.email.message}</Warn>}
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            name="password"
            aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
            {...register('password', {
              required: '*비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: '*6자리 이상 비밀번호를 사용하세요.',
              },
            })}
          />
          {errors.password && <Warn>{errors.password.message}</Warn>}
          {signInError && <Warn>*{signInError}</Warn>}
          <CheckBox>
            <input id="auto_login" type="checkbox" />
            <label htmlFor="auto_login">자동 로그인</label>
          </CheckBox>
        </FormFieldTop>
        <FormFieldBottom>
          {isSubmitting || errors.accountId || errors.password ? (
            <Button
              onClick={signInFunc}
              type="submit"
              background={'#B1BCE6'}
              disabled
              color={'white'}
              border={'white'}
              cursor={'default'}
            >
              시작하기
            </Button>
          ) : (
            <Button onClick={signInFunc} type="submit" background={'#3C58C1'} color={'white'}>
              시작하기
            </Button>
          )}
          <Button onClick={goToSignUp} type="submit" background={'white'} color={'#3C58C1'}>
            회원가입
          </Button>
        </FormFieldBottom>
      </FormField>
    </Main>
  );
};

export default SignInPage;

const Main = styled.div`
  background: white;
  max-width: 412px;
  height: 100vh;
  margin: 0 auto;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
`;
const Label = styled.label`
  margin-top: 20px;
  font-size: 12px;
  color: #767676;
`;
const FormField = styled.form`
  padding: 0 34px 34px 34px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const FormFieldTop = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormFieldBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Input = styled.input`
  padding: 10px 0 5px 0;
  margin-bottom: 2px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
`;
const Warn = styled.strong`
  color: #eb5757;
  font-size: 12px;
`;
const CheckBox = styled.div`
  margin-top: 10px;
`;
const Button = styled.button`
  padding: 13px 0 13px 0;
  background-color: ${(props) => props.background};
  font-size: 14px;
  color: ${(props) => props.color};
  border-radius: 44px;
  border: 1px solid #3c58c1;
  border-color: ${(props) => props.border};
  cursor: ${(props) => props.cursor};
`;
