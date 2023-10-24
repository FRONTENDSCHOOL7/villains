import React from 'react';
import PageTemplate from '../components/PageTemplate';
import Splash from '../components/Splash';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import pageUrlConfig from '../config/pageUrlConfig';

function SplashPage() {
  const SplashPageTemplate = styled(PageTemplate)`
    background: white;
  `;
  return (
    <SplashPageTemplate>
      <Splash />
    </SplashPageTemplate>
  );
}

export default SplashPage;
