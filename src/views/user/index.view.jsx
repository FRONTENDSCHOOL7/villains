import React, { useEffect } from 'react';
import { Outlet, useRouteLoaderData, useParams, useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import triggerAtom from '../../atoms/tirggerAtom';
import { bottomSheetOptions, bottomSheetStateAtom } from '../../atoms/bottomSheetStateAtom';
import userAtom from '../../atoms/userAtom';

import pageUrlConfig from '../../config/pageUrlConfig';
import useConfirm from '../../hooks/useConfirm';
import useBottomSheetOptions from '../../hooks/useBottomSheetOptions';

import NavMenu from '../../components/layout/NavMenu';
import BackHeader from '../../components/layout/BackHeader';
import DefaultBtn, { BasicStyle } from '../../components/button/GlobalButton';
import Tanghulu from '../../components/icon/Tanghulu';

import ArrowIcon from '../../components/icon/ArrowIcon';
import ConfirmModal from '../../components/modal/ConfirmModal';

const ProfileIndexPage = () => {
  const user = useRouteLoaderData('user');
  const navigate = useNavigate();
  const location = useLocation();
  const { accountname } = useParams();
  const { pathname } = useLocation();

  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetOptions);
  const [bottomSheetToggle, setBottomSheetToggle] = useRecoilState(bottomSheetStateAtom);

  const setUserInfo = useSetRecoilState(userAtom);

    // useConfirm 훅 사용
    const { isConfirmVisible, confirmMessage, showConfirm, handleConfirm, handleCancel } = useConfirm();

  const profileReport = () => {
    alert('신고완료');
  };

  const logout = (message, callback) => {
    console.log(bottomSheetToggle)
    showConfirm(message, callback);
    localStorage.clear();
    setUserInfo(null);
    navigate(`${import.meta.env.BASE_URL}`);
    setBottomSheetToggle((prev) => !prev);
  };

  const currentAccountname = user.accountname;
  const authorAccountname = accountname;
  // 바텀시트 옵션 생성
  const options = useBottomSheetOptions({
    currentAccountname,
    authorAccountname,
    logout: () => showConfirm('정말 떠나실건가요?', logout),
    profileReport: () => showConfirm('어떤 빌런인가요?', profileReport),
    type: 'user',
  });


  const handleBottomSheetShow = (event) => {
    event.stopPropagation();
    setBottomSheet(options);
    setBottomSheetToggle((prev) => !prev);
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
            <ArrowIcon direct={"left"}/>
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
      {isConfirmVisible && (
        <ConfirmModal
        content={confirmMessage}
        confirmText="로그아웃"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
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
