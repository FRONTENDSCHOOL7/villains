import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pageUrlConfig from '../../config/pageUrlConfig';

import menuIcon from '../../assets/img/menu-list.svg';
import goodsIcon from '../../assets/img/goods.svg';
import homeIcon from '../../assets/img/home.svg';
import chatIcon from '../../assets/img/message-circle.svg';
import userIcon from '../../assets/img/user-icon.svg';
import { IconBtn, NavButton } from '../Buttons';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

//import styled from 'styled-components';

const NavMenu = () => {
  const pathname = useLocation();
  // const { state } = location.state;

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  // const [pathName, setPathname] = useState(location.state?.pathName);

  // const [clickedBtn, setClickedBtn] = useStated('Btn');

  // const handleclickBtn = () =>
  // //버튼 UI on/off 처리
  //   setClickedBtn(현재 IconBtn);
  // };

  return (
    <Nav>
      <Link to="/feed">
        <NavButton Img={menuIcon}>피드 메뉴 버튼</NavButton>
      </Link>

      <Link to="/goods">
        <NavButton Img={goodsIcon}>택배 버튼</NavButton>
      </Link>

      <Link to="/main">
        <NavButton Img={homeIcon}>홈 버튼</NavButton>
      </Link>

      <Link to="/chat">
        <NavButton Img={chatIcon}>메세지 버튼</NavButton>
      </Link>

      <Link to="/user">
        <NavButton Img={userIcon}>프로필 버튼</NavButton>
      </Link>
    </Nav>
  );
};
export default NavMenu;

const Nav = styled.nav`
  width: 412px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  & > * {
    flex-basis: calc(100% / 5);
  }
`;
