import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pageUrlConfig from '../../config/pageUrlConfig';
import Logo from '/img/Logo.png';

import Kakao from '../../assets/img/kakao.svg';
import Google from '../../assets/img/google.svg';
import Facebook from '../../assets/img/facebook.svg';
import Email from '../../assets/img/email.svg';

import { Main } from '../../components/layout/PageTemplate.style';
import { IconBtn } from '../../components/button/Buttons';

const SplashPage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [backgroundBlue, setBackgroundBlue] = useState(false);
  const [showSnsWrap, setShowSnsWrap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setBackgroundBlue(true);
      setTimeout(() => {
        setShowSnsWrap(true);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const moveToLogin = () => {
    navigate(pageUrlConfig.signInPage);
  };

  const moveToSingUp = () => {
    navigate(pageUrlConfig.signUpPage);
  };

  return (
    <PageTemplate>
      <SplashField logo={Logo} color={backgroundBlue ? '#3c58c1' : 'white'}>
        {showSnsWrap && (
          <SnsWrap>
            <IconBtn img={Email} onClick={moveToLogin} text={'이메일로 로그인'} disabled={false}></IconBtn>
            <IconBtn img={Kakao} disabled={true} text={'카카오톡 계정으로 로그인'}></IconBtn>
            <IconBtn img={Google} disabled={true} text={'구글 계정으로 로그인'}></IconBtn>
            <IconBtn img={Facebook} disabled={true} text={'페이스북 계정으로 로그인'}></IconBtn>
            <ButtonWrap>
              <BottomBtn>아이디/비밀번호 찾기</BottomBtn>
              <Line>|</Line>
              <BottomBtn onClick={moveToSingUp}>회원가입</BottomBtn>
            </ButtonWrap>
          </SnsWrap>
        )}
      </SplashField>
    </PageTemplate>
  );
};
const PageTemplate = styled(Main)`
  overflow-y: hidden;
  height: 100vh;
`;
const SplashField = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
  background-image: url(${(props) => props.logo});
  background-size: 380px;
  background-repeat: no-repeat;
  background-position: center 25%;
  background-color: ${(props) => props.color};

  transition: background-color 1s;
`;

const SnsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px 34px 50px 34px;
  background: white;
  border-radius: 20px 20px 0 0;

  transform: translateY(100%);
  animation: slideUp 1s forwards;

  @keyframes slideUp {
    to {
      transform: translateY(0);
    }
  }
`;
const ButtonWrap = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: #767676;
  display: flex;
  gap: 12px;
  justify-content: center;
`;
const BottomBtn = styled.button`
  font-size: 12px;
  color: #767676;
`;
const Line = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default SplashPage;
