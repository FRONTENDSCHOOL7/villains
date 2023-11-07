import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import pageUrlConfig from '../../config/pageUrlConfig';
import client from '../../config/api.config';
import { Main } from '../../components/PageTemplate.style';
import { BlueLongBtn, WhiteLongBtn } from '../../components/Buttons';
import CheckBox from '../../components/CheckBox';
import userAtom from '../../atoms/userAtom';

const SignInPage = () => {
  //로그인 시 userInfo를 Atom에 저장하기
  const [user, setUser] = useRecoilState(userAtom);
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
  // 에러 메시지 이후 사용자가 이메일 칸을 재 작성시 에러 메시지 삭제
  useEffect(() => {
    setSignInError('');
  }, [userEmail]);
  // navigate
  const navigate = useNavigate();
  // 뒤로가기 막기
  useEffect(() => {
    localStorage.clear();
    const preventGoBack = () => {
      // change start
      history.pushState(null, '', location.href);
      // change end
      if (window.confirm('사이트를 나가시겠습니까?')) {
        navigate(pageUrlConfig.splashPage);
      } else {
      }
    };

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

  // 로그인 함수
  const signInFunc = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user/login', {
        user: {
          email: userEmail,
          password: userPwd,
        },
      });
      console.log(response);
      // 성공시 localstorage 저장 후 /main 이동
      if (response.status === 200 && response.data.status !== 422) {
        const userInfo = {
          accountname: response.data.user.accountname,
          token: response.data.user.token,
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        handleGoToMain();
      }
      // 실패시 에러 메시지 보여주기
      if (response.status === 200 && response.data.status === 422) {
        console.log(response.data.status);
        setSignInError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToMain = async () => {
    try {
      const response = await client.post('/user/login', {
        user: {
          email: 'villains@test.com',
          password: '123123',
        },
      });
      // 성공시 localstorage 저장 후 /main 이동
      if (response.status === 200 && response.data.status !== 422) {
        const userInfo = {
          accountname: response.data.user.accountname,
          token: response.data.user.token,
        };
        localStorage.setItem('admin', JSON.stringify(userInfo));
        navigate(pageUrlConfig.homePage);
      }
      // 실패시 에러 메시지 보여주기
      if (response.status === 200 && response.data.status === 422) {
        console.log(response.data.status);
        alert('주의! 관리자 계정 로그인 실패!');
      }
    } catch (error) {
      console.log(error);
      alert('주의! 관리자 계정 로그인 실패!');
    }
  };

  const goToSignUp = () => {
    navigate(pageUrlConfig.signUpPage);
  };

  return (
    <PageTemplate>
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
          {errors.password ? (
            <Warn>{errors.password.message}</Warn>
          ) : (
            signInError && <Warn>*{signInError}</Warn>
          )}
          <CheckBoxWrap>
            <CheckBox text={'자동 로그인'} id={'auto_login'}></CheckBox>
          </CheckBoxWrap>
        </FormFieldTop>
        <FormFieldBottom>
          {isSubmitting || errors.email || errors.password ? (
            <BlueLongBtn onClick={signInFunc} disabled={true} text={'시작하기'}></BlueLongBtn>
          ) : (
            <BlueLongBtn onClick={signInFunc} text={'시작하기'}></BlueLongBtn>
          )}
          <WhiteLongBtn onClick={goToSignUp} text={'회원가입'}></WhiteLongBtn>
        </FormFieldBottom>
      </FormField>
    </PageTemplate>
  );
};

export default SignInPage;

const PageTemplate = styled(Main)`
  overflow-y: hidden;
  height: 100vh;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
  font-family: 'SUIT';
  font-weight: 400;
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
const CheckBoxWrap = styled.div`
  margin-top: 20px;
`;
