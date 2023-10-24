import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../public/img/Logo1.svg';
import Logo2 from '../../public/img/Logo2.svg';
import styled from 'styled-components';

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
    padding: 40px 34px 70px 34px;
    background: white;
    border-radius: 20px 20px 0 0;
  `;
  const SnsButton = styled.button`
    padding: 14px 0 13px 0;
    border-radius: 44px;
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.border};
  `;
  const ButtonWrap = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    align-item: center;
  `;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  return (
    <div>
      {showSplash ? ( // showSplash가 true일 때만 field_splash가 나타납니다.
        <SplashField logo={Logo1} color={'white'}></SplashField>
      ) : (
        <SplashField logo={Logo2} color={'#3c58c1'}>
          <SnsWrap>
            <SnsButton border={'#3C58C1'}>이메일로 로그인</SnsButton>
            <SnsButton border={'#F2C94C'}>카카오톡 계정으로 로그인</SnsButton>
            <SnsButton border={'#767676'}>구글 계정으로 로그인</SnsButton>
            <SnsButton border={'#2D9CDB'}>페이스북 계정으로 로그인</SnsButton>
            <ButtonWrap>
              <button>아이디/비밀번호 찾기</button>
              <span>|</span>
              <button>회원가입</button>
            </ButtonWrap>
          </SnsWrap>
        </SplashField>
      )}
    </div>
  );
}

export default Splash;
