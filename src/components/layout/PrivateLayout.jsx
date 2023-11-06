import { Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect, useMemo } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import realProductAuthor from '../../atoms/realProductAuthorAtom';
import userAtom from '../../atoms/userAtom';
import pageUrlConfig from '../../config/pageUrlConfig';
import BackHeader from './BackHeader';
import styled from 'styled-components';
import Tanghulu from '../Tanghulu';
import NavMenu from './NavMenu';
import { Wrap } from '../PageTemplate.style';

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
  return (
    <Wrap>
      <BackHeader onClick={handleClickBack}>
        {pathname.startsWith('/goods/') && productAccountname === user.accountname && <Tanghulu></Tanghulu>}
      </BackHeader>
      <BackGround />
      <Outlet />
      <NavMenu />
    </Wrap>
  );
};

export default PrivateLayout;

const BackGround = styled.div`
  height: 48px;
`;
