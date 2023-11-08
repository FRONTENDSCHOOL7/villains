import React, {useEffect} from "react";
import { Outlet, useRouteLoaderData, useParams, useNavigate, useLocation } from "react-router";
import NavMenu from '../../components/layout/NavMenu';
import BackHeader from '../../components/layout/BackHeader';
import DefaultBtn, { BasicStyle } from '../../components/default/GlobalButton';
import BackArrow from '../../assets/img/icon-arrow-left.svg';
import styled from 'styled-components';
import Tanghulu from '../../components/default/Tanghulu';
import pageUrlConfig from '../../config/pageUrlConfig';

const ProfileIndexPage = () => {
  const user = useRouteLoaderData('user');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { accountname } = useParams();
  
  useEffect(() => {
    if(!accountname) navigate(`${pageUrlConfig.profilePage}/${user.accountname}`)
  }, [])
    
  const handleClickBack = () => {
    navigate(-1);
  };
  
  return (
    <>
      <BackHeader>
        <BackArrowBtn variant={'basic'} onClick={handleClickBack}>
          <img src={BackArrow} alt="뒤로가기" />
        </BackArrowBtn>
        <Tanghulu />
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
