import { Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import realProductAuthor from '../../atoms/realProductAuthorAtom';
import userAtom from '../../atoms/userAtom';
import pageUrlConfig from '../../config/pageUrlConfig';
import BackHeader from './BackHeader';
import styled from 'styled-components';
import Tanghulu from '../default/Tanghulu';
import { Wrap } from './PageTemplate.style';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const { pathname } = useLocation();
  const key = localStorage.getItem('user');
  // 택배 요청 글의 작성자 accountname
  const productAccountname = useRecoilValue(realProductAuthor);

  useEffect(() => {
    if (!key) {
      navigate(pageUrlConfig.signInPage, { state: pathname });
    } else {
      setUser(JSON.parse(key));
    }
  }, []);

  const handleClickBack = () => {
    const mainPath = pathname.split('/')[1];
    navigate(`/${mainPath}`);
  };
  //왜 여기에 헤더가 있는데 다른 페이지에서 헤더를 추가하면 여기에 있는 헤더가 먹힐까요..?
  return (
    <PrivateWrap>
      <Outlet />
    </PrivateWrap>
  );
};

export default PrivateLayout;



const PrivateWrap = styled(Wrap)`
  border: none;
`;
