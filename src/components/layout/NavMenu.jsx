import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pageUrlConfig from '../../config/pageUrlConfig';

import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { BasicStyle } from '../GlobalButton';
import theme from '../../style/theme';

//import styled from 'styled-components';

const NavMenu = () => {
  const {pathname} = useLocation();
  const navContents = [[`feed`, `피드`],[`goods`, `택배`], [`main`, `홈`], [`chat`, `채팅`], [`user`, `프로필`]];
  return (
    <Nav>

      {navContents.map((content, index)=>{
        const click = pathname.includes(content[0]);
        const src = click ? `nav-${content[0]}-click.svg` : `nav-${content[0]}.svg`;
        return (
          <Link to={`/${content[0]}`} key={index}>
            <NavButton state={click}><img src={`${import.meta.env.BASE_URL}nav/${src}`} alt={content[1]}/><span>{content[1]}</span></NavButton>
          </Link>
          )
      })}
      {/* <Link to="/feed">
        <NavButton>피드 메뉴 버튼</NavButton>
      </Link>

      <Link to="/goods">
        <NavButton>택배 버튼</NavButton>
      </Link>

      <Link to="/main">
        <NavButton>홈 버튼</NavButton>
      </Link>

      <Link to="/chat">
        <NavButton>메세지 버튼</NavButton>
      </Link>

      <Link to="/user">
        <NavButton>프로필 버튼</NavButton>
      </Link> */}
    </Nav>
  );
};
export default NavMenu;

const Nav = styled.nav`
  width: 412px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  margin-bottom: 0;
  background-color: ${theme.color.white};
  border-top: 1px solid ${theme.color.light};
  display: flex;
  & > * {
    flex-grow: 1;
  }
`;

const BorderStyle = css`
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    margin-top: 0;
    width: 50%;
    border-top: 3px solid ${theme.color.primary};
`;

const NavButton = styled.div`
  ${BasicStyle}
  color: ${theme.color.grey};
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 16px;
  position: relative;

  &::before{
    ${(props)=>{
      return props.state ?  BorderStyle : ''
    }}
  }

  &:hover::before{${BorderStyle}}

  display: flex;
  flex-direction: column;
  flex-basis: calc(100% / 5);
  justify-content: center;
  align-items: center;
  gap: 5px;
`;