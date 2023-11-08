import React, {useEffect} from "react";
import { Outlet, useRouteLoaderData, useParams, useNavigate, useLocation } from "react-router";
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import triggerAtom from "../../atoms/tirggerAtom";

import pageUrlConfig from '../../config/pageUrlConfig';
import NavMenu from '../../components/layout/NavMenu';
import BackHeader from '../../components/layout/BackHeader';
import DefaultBtn, { BasicStyle } from '../../components/default/GlobalButton';
import Tanghulu from '../../components/default/Tanghulu';

import BackArrow from '../../assets/img/icon-arrow-left.svg';

const ProfileIndexPage = () => {
  const user = useRouteLoaderData('user');
  const navigate = useNavigate();
  const location = useLocation();
  const { accountname } = useParams();

  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  
  useEffect(() => {
    if(!accountname) navigate(`${pageUrlConfig.profilePage}/${user.accountname}`)
  }, [])
    
  const handleClickBack = () => {
    navigate(-1);
  };
  
  const handleClickSubmit = () => {
    setTrigger(true);
    console.log(location);
  }

  return (
    <>
      <BackHeader>
        <BackArrowBtn variant={'basic'} onClick={handleClickBack}>
          <img src={BackArrow} alt="뒤로가기" />
        </BackArrowBtn>
        {location.pathname.includes('edit') ?
         <BtnWrap onClick={handleClickSubmit}>
          <DefaultBtn >저장</DefaultBtn>
        </BtnWrap>
        :<Tanghulu />
        }
      </BackHeader>
      <Outlet />
      <NavMenu />
    </>
  ); 
}

export default ProfileIndexPage;

const BackArrowBtn = styled.button`
  ${BasicStyle}
  margin-right: 8px;
`;

const BtnWrap = styled.div`
  flex-basis: 20%;
`