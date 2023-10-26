import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../config/pageUrlConfig';
import client from '../config/api.config';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: 'onChange' });
  const userAccountId = watch('accountId');
  const userEmail = watch('email');
  const userPwd = watch('password');
  // 에러 메시지 저장 useState
  const [signInError, setSignInError] = useState('');
  const [checkIDMessage, setCheckIdMessage] = useState('');
  const [checkEmailMessage, setCheckEmailMessage] = useState('');

  useEffect(() => {
    setCheckIdMessage('');
  }, [userAccountId]);
  useEffect(() => {
    setCheckEmailMessage('');
  }, [userEmail]);
  // navigate
  const navigate = useNavigate();

  const checkID = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user/accountnamevalid', {
        user: {
          accountname: userAccountId,
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setCheckIdMessage(response.data.message);
      }
    } catch (error) {
      setCheckIdMessage(error.response.data);
    }
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user/emailvalid', {
        user: {
          email: userEmail,
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setCheckEmailMessage(response.data.message);
      }
    } catch (error) {
      setCheckEmailMessage(error.response.data);
    }
  };

  const signUpFunc = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user', {
        user: {
          username: userAccountId,
          email: userEmail,
          password: userPwd,
          accountname: userAccountId,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        alert("회원가입이 완료되었습니다.");
        navigate(pageUrlConfig.signInPage);
      }
      if (response.data.status === 422) setSignInError(response.data.message);
    } catch (error) {
      console.log(error.response.data);
      setSignInError(error.response.data);
    }
  };

  return (
    <Main>
      <Title>회원가입</Title>
      <FormField
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
        })}
      >
        <FormFieldTop>
          <Label htmlFor="accountId">계정ID</Label>
          <InputWrap>
            <Input
              id="accountId"
              type="accountId"
              name="accountId"
              placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능"
              aria-invalid={isSubmitted ? (errors.accountId ? 'true' : 'false') : undefined}
              {...register('accountId', {
                required: '*계정ID를 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z0-9._]+$/,
                  message: '*계정ID 형식에 맞지 않습니다.',
                },
              })}
            />
            {userAccountId ? (
              <Button2 onClick={checkID} background={'#3C58C1'} color={'white'}>
                중복확인
              </Button2>
            ) : (
              <Button2
                onClick={checkID}
                disabled
                background={'#B1BCE6'}
                color={'white'}
                border={'white'}
                cursor={'default'}
              >
                중복확인
              </Button2>
            )}
          </InputWrap>
          {errors.accountId ? (
            <Warn color={'#EB5757'}>{errors.accountId.message}</Warn>
          ) : (
            checkIDMessage !== '잘못된 접근입니다.' && <Warn color={'#4CAF50'}>{checkIDMessage}</Warn>
          )}
          <Label htmlFor="email">이메일</Label>
          <InputWrap>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="이메일 주소를 입력해 주세요."
              aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
              {...register('email', {
                required: '*이메일을 입력해주세요.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '*이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            {userEmail ? (
              <Button2 onClick={checkEmail} background={'#3C58C1'} color={'white'}>
                중복확인
              </Button2>
            ) : (
              <Button2
                onClick={checkEmail}
                disabled
                background={'#B1BCE6'}
                color={'white'}
                border={'white'}
                cursor={'default'}
              >
                중복확인
              </Button2>
            )}
          </InputWrap>
          {errors.email ? (
            <Warn color={'#EB5757'}>{errors.email.message}</Warn>
          ) : (
            checkEmailMessage && <Warn color={'#4CAF50'}>{checkEmailMessage}</Warn>
          )}
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 설정해 주세요."
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
            <Warn color={'#EB5757'}>{errors.password.message}</Warn>
          ) : (
            signInError && <Warn color={'#EB5757'}>*{signInError}</Warn>
          )}
          <CheckBoxField>
            <CheckBox>
              <input id="all" type="checkbox" />
              <label htmlFor="all">전체동의</label>
            </CheckBox>
            <CheckBoxList>
              <CheckBox>
                <input id="info" type="checkbox" />
                <label htmlFor="info">
                  개인 정보 약관 동의<span>(필수)</span>
                </label>
              </CheckBox>
              <CheckBox>
                <input id="location" type="checkbox" />
                <label htmlFor="location">
                  위치 정보 동의<span>(필수)</span>
                </label>
              </CheckBox>
              <CheckBox>
                <input id="age14" type="checkbox" />
                <label htmlFor="age14">
                  14세 이상<span>(필수)</span>
                </label>
              </CheckBox>
            </CheckBoxList>
          </CheckBoxField>
        </FormFieldTop>
        <FormFieldBottom>
          {isSubmitting ||
          errors.accountId ||
          errors.password ||
          errors.email ||
          userAccountId === '' ||
          userEmail === '' ||
          userPwd === '' ? (
            <Button
              onClick={signUpFunc}
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
            <Button onClick={signUpFunc} type="submit" background={'#3C58C1'} color={'white'}>
              시작하기
            </Button>
          )}
        </FormFieldBottom>
      </FormField>
    </Main>
  );
};

export default SignUpPage;

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
const InputWrap = styled.div`
  display: flex;
`;
const Input = styled.input`
  padding: 10px 0 5px 0;
  margin-bottom: 2px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  flex-grow: 10;
`;
const Warn = styled.strong`
  color: ${(props) => props.color};
  font-size: 12px;
`;
const CheckBoxField = styled.div`
  margin-top: 10px;
`;
const CheckBox = styled.div`
  margin-top: 10px;
`;
const CheckBoxList = styled.div`
  display: flex;
  flex-direction: column;
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
const Button2 = styled(Button)`
  padding: 8px 20px 8px 20px;
  border-radius: 32px;
  flex-grow: 1;
`;
