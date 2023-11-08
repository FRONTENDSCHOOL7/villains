import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import pageUrlConfig from '../../config/pageUrlConfig';

import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { BasicStyle } from '../default/GlobalButton';
import theme from '../../style/theme';

const NavMenu = () => {
  const { pathname } = useLocation();
  const user = useRouteLoaderData('user');
  const navContents = [
    [`feed`, `피드`],
    [`goods`, `택배`],
    [`main`, `홈`],
    [`chat`, `채팅`],
    [`user`, `프로필`],
  ];
  return (
    <>
      <Nav>
        {navContents.map((content, index) => {
          const click = pathname.includes(content[0]);
          const src = click ? `nav-${content[0]}-click.svg` : `nav-${content[0]}.svg`;
          return (
            <Link to={`${import.meta.env.BASE_URL}${content[0]}`} key={index}>
              <NavButton state={click}>
                <img src={`${import.meta.env.BASE_URL}nav/${src}`} alt={content[1]} />
                <span>{content[1]}</span>
              </NavButton>
            </Link>
          );
        })}
      </Nav>
      <BackGround />
    </>
  );
};
export default NavMenu;

const Nav = styled.nav`
  width: 410px;
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
  width: 40px;
  height: 3px;
  background-color: ${theme.color.primary};
  border-radius: 0px 0px 3px 3px;
`;

const NavButton = styled.div`
  ${BasicStyle}
  color: ${theme.color.grey};
  border-radius: 8px;
  width: calc(410px / 5);
  height: 100%;
  padding: 16px;
  position: relative;

  &::before {
    ${(props) => {
      return props.state === true ? BorderStyle : '';
    }}
  }

  &:hover::before {
    ${BorderStyle}
  }

  display: flex;
  flex-direction: column;
  flex-basis: calc(100% / 5);
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const BackGround = styled.div`
  height: 80px;
`;
