import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';
import client from '../../config/api.config';
import { useForm } from 'react-hook-form';
import PageTemplate from '../../components/PageTemplate';
import { CommonBtn, SmallBtn } from '../../components/Buttons';

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
  // 중복 방지 버튼 누른 후 다시 입력 폼을 사용자가 수정할 시 표시 내용 초기화
  useEffect(() => {
    setCheckIdMessage('');
  }, [userAccountId]);
  useEffect(() => {
    setCheckEmailMessage('');
  }, [userEmail]);
  // navigate
  const navigate = useNavigate();
  // 계정 id 중복방지 함수
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
      setCheckIdMessage(error.response.data.message);
    }
  };
  // 이메일 중복방지 함수
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
      setCheckEmailMessage(error.response.data.message);
    }
  };
  // 회원가입 함수
  const signUpFunc = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user', {
        user: {
          // username이랑 accountname이 필수로 들어가야하는데 저희는 회원가입 폼에 계정id 하나밖에 없어서 일단 동일하게 넣었습니다.
          username: userAccountId,
          email: userEmail,
          password: userPwd,
          accountname: userAccountId,
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        alert('회원가입이 완료되었습니다.');
        navigate(pageUrlConfig.signInPage);
      }
    } catch (error) {
      console.log(error.response.data);
      setSignInError(error.response.data.message);
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
              <SmallBtn onClick={checkID} background={'#3C58C1'} color={'white'} text={'중복확인'}></SmallBtn>
            ) : (
              <SmallBtn
                onClick={checkID}
                disabled={true}
                background={'#B1BCE6'}
                color={'white'}
                border={'white'}
                cursor={'default'}
                text={'중복확인'}
              ></SmallBtn>
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
              <SmallBtn
                onClick={checkEmail}
                background={'#3C58C1'}
                color={'white'}
                text={'중복확인'}
              ></SmallBtn>
            ) : (
              <SmallBtn
                onClick={checkEmail}
                disabled={true}
                background={'#B1BCE6'}
                color={'white'}
                border={'white'}
                cursor={'default'}
                text={'중복확인'}
              ></SmallBtn>
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
            <CommonBtn
              onClick={signUpFunc}
              type="submit"
              background={'#B1BCE6'}
              disabled={true}
              color={'white'}
              border={'white'}
              cursor={'default'}
              text={'시작하기'}
            ></CommonBtn>
          ) : (
            <CommonBtn
              onClick={signUpFunc}
              type="submit"
              background={'#3C58C1'}
              color={'white'}
              text={'시작하기'}
            ></CommonBtn>
          )}
        </FormFieldBottom>
      </FormField>
    </Main>
  );
};

export default SignUpPage;

const Main = styled(PageTemplate)`
  background: white;
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
