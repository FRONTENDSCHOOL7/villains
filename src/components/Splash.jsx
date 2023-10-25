import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../public/img/Logo1.svg';
import Logo2 from '../../public/img/Logo2.svg';
import Kakao from '../assets/kakao.svg';
import Google from '../assets/google.svg';
import Facebook from '../assets/facebook.svg';
import Email from '../assets/email.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import pageUrlConfig from '../config/pageUrlConfig';

function Splash() {
  const SplashField = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 100vh;
    background-image: url(${(props) => props.logo});
    background-repeat: no-repeat;
    background-position: center 40%;
    background-color: ${(props) => props.color};
  `;
  const SnsWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 40px 34px 50px 34px;
    background: white;
    border-radius: 20px 20px 0 0;
  `;
  const SnsButton = styled.button`
    padding: 13px 0 11px 0;
    border-radius: 44px;
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.border};
    background-image: url(${(props) => props.img});
    background-repeat: no-repeat;
    background-position: 14px 51%;
  `;
  const DisabledBtn = styled(SnsButton)`
    cursor: default;
    border-color: #767676;
    color: #767676;
    fill: #767676;
  `;
  const ButtonWrap = styled.div`
    margin-top: 20px;
    font-size: 12px;
    color: #767676;
    display: flex;
    gap: 12px;
    justify-content: center;
    align-item: center;
  `;
  const BottomBtn = styled.button`
    font-size: 12px;
    color: #767676;
  `;
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  const moveToLogin = () => {
    navigate(pageUrlConfig.loginPage);
  };

  const moveToSingUp = () => {
    navigate(pageUrlConfig.SignUpPage);
  }

  return (
    <div>
      {showSplash ? ( // showSplash가 true일 때만 field_splash가 나타납니다.
        <SplashField logo={Logo1} color={'white'}></SplashField>
      ) : (
        <SplashField logo={Logo2} color={'#3c58c1'}>
          <SnsWrap>
            <SnsButton border={'#3C58C1'} img={Email} onClick={moveToLogin}>
              이메일로 로그인
            </SnsButton>
            <DisabledBtn border={'#F2C94C'} img={Kakao} disabled>
              카카오톡 계정으로 로그인
            </DisabledBtn>
            <DisabledBtn border={'#767676'} img={Google}>
              구글 계정으로 로그인
            </DisabledBtn>
            <DisabledBtn border={'#2D9CDB'} img={Facebook}>
              페이스북 계정으로 로그인
            </DisabledBtn>
            <ButtonWrap>
              <BottomBtn>아이디/비밀번호 찾기</BottomBtn>
              <span>|</span>
              <BottomBtn onClick={moveToSingUp}>회원가입</BottomBtn>
            </ButtonWrap>
          </SnsWrap>
        </SplashField>
      )}
    </div>
  );
}

export default Splash;
