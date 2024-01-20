import { useNavigate, useRouteError } from 'react-router';
import { Main } from '../components/PageTemplate.style';
import ErrorIcon from '../components/icon/ErrorIcon';
import styled from 'styled-components';
import { BlueLongBtn } from '../components/Buttons';

const ErrorPage = ({ errorMessage }) => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <PageTemplate>
      <ErrorIcon />
      <strong>{errorMessage || '페이지를 찾을 수 없습니다. :('}</strong>
      {/* {error.statusText || error.message} */}
      <StyledBtn>
        <BlueLongBtn text="이전 페이지" onClick={handleBackClick} />
      </StyledBtn>
    </PageTemplate>
  );
};

export default ErrorPage;

const PageTemplate = styled(Main)`
  display: flex;
  flex-flow: wrap column;
  justify-content: center;
  gap: 30px;

  margin-top: -30px;
  text-align: center;
  color: #767676;
`;

const StyledBtn = styled.div`
  padding: 0 134px;
  display: flex;
  flex-direction: column;
`;
