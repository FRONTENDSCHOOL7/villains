import React, { useEffect } from 'react';
import { Outlet, useRouteLoaderData, useParams, useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import triggerAtom from '../../atoms/tirggerAtom';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import userAtom from '../../atoms/userAtom';

import pageUrlConfig from '../../config/pageUrlConfig';
import useModal from '../../hooks/useModal';
import useBottomSheetOptions from '../../hooks/useBottomSheetOptions';

import NavMenu from '../../components/layout/NavMenu';
import BackHeader from '../../components/layout/BackHeader';
import DefaultBtn, { BasicStyle } from '../../components/default/GlobalButton';
import Tanghulu from '../../components/default/Tanghulu';

import BackArrow from '../../assets/img/icon-arrow-left.svg';
import Modal from '../../components/Modal';
// import logout from "../../components/splash/logout";

const ProfileIndexPage = () => {
  const user = useRouteLoaderData('user');
  const navigate = useNavigate();
  const location = useLocation();
  const { accountname } = useParams();
  const { pathname } = useLocation();

  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetOptions);
  const setUserInfo = useSetRecoilState(userAtom);

  // useModal 훅 사용
  const { isModalVisible, modalContent, showModal, handleModalConfirm, handleModalCancel } = useModal();

  const profileReport = () => {
    alert('신고완료');
  };

  const logout = () => {
    localStorage.clear();
    setUserInfo(null);
    setBottomSheetToggle(!bottomSheetToggle);
    navigate(`${import.meta.env.BASE_URL}`);
  };

  const currentAccountname = user.accountname;
  const authorAccountname = accountname;
  // 바텀시트 옵션 생성
  const options = useBottomSheetOptions({
    currentAccountname,
    authorAccountname,
    logout: () => showModal('정말 떠나실건가요?', logout),
    profileReport: () => showModal('어떤 빌런인가요?', profileReport),
    type: 'user',
  });

  const [bottomSheetToggle, setBottomSheetToggle] = useRecoilState(bottomSheetStateAtom);

  const handleBottomSheetShow = (event) => {
    event.stopPropagation();
    setBottomSheet(options);
    setBottomSheetToggle(!bottomSheetToggle);
  };

  useEffect(() => {
    if (!accountname) {
      navigate(`${pageUrlConfig.profilePage}/${user.accountname}`);
    }
  }, [accountname]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickSubmit = () => {
    setTrigger(true);
  };

  return (
    <>
      <BackHeader>
        {pathname.split('/').length > 4 ?  (
          <BackArrowBtn variant={'basic'} onClick={handleClickBack}>
            <img src={BackArrow} alt="뒤로가기" />
          </BackArrowBtn>
        ) : <div></div>}
        {location.pathname.includes('edit') ? (
          <BtnWrap onClick={handleClickSubmit}>
            <DefaultBtn>저장</DefaultBtn>
          </BtnWrap>
        ) : (
          <Tanghulu onClick={handleBottomSheetShow} />
        )}
      </BackHeader>
      {isModalVisible && (
        <Modal content={modalContent} confirmText={`응`} cancelText={'미안'} onConfirm={handleModalConfirm} />
      )}
      <Outlet />
      <NavMenu />
    </>
  );
};

export default ProfileIndexPage;

const BackArrowBtn = styled.button`
  ${BasicStyle}
  margin-right: 8px;
`;

const BtnWrap = styled.div`
  flex-basis: 20%;
`;
