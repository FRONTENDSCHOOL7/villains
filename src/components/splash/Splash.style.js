import styled from 'styled-components';

const SplashField = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
  background-image: url(${(props) => props.logo});
  background-repeat: no-repeat;
  background-position: center 40%;
  background-color: ${(props) => props.color};
`;
const SnsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px 34px 50px 34px;
  background: white;
  border-radius: 20px 20px 0 0;
`;
const SnsButton = styled.button`
  color: #767676;
  padding: 11px 0 11px 0;
  border-radius: 9999px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.border};
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: 14px 51%;
`;
const DisabledBtn = styled(SnsButton)`
  cursor: default;
  border-color: #767676;
  color: #767676;
  fill: #767676;
`;
const ButtonWrap = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: #767676;
  display: flex;
  gap: 12px;
  justify-content: center;
`;
const BottomBtn = styled.button`
  font-size: 12px;
  color: #767676;
`;

export { SplashField, SnsWrap, SnsButton, DisabledBtn, ButtonWrap, BottomBtn };
