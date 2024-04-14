import styled from 'styled-components';
import ResizingTextarea from './ResizingTextarea';

const IconBtn = ({ children,iconimg, handleIconBtnClick, profile }) => (
  <StyledIconBtn iconimg={iconimg} onClick={handleIconBtnClick} profile={profile}>
    {children}
  </StyledIconBtn>
);

const TextArea = ({ text, setText, placeholder }) => {
  const handleTextChange = (event) => setText(event.target.value);

  return <ResizingTextarea rows="1" placeholder={placeholder} onChange={handleTextChange} value={text} />;
};

const SubmitBtn = ({ text, handleTextFieldSubmit, submitText }) => (
  <StyledSubmitBtn onClick={handleTextFieldSubmit} disabled={!text}>
    {submitText}
  </StyledSubmitBtn>
);

const DefaultInputField = ({ children }) => {
  return <StyledForm>{children}</StyledForm>;
};

DefaultInputField.IconBtn = IconBtn;
DefaultInputField.TextArea = TextArea;
DefaultInputField.SubmitBtn = SubmitBtn;

export default DefaultInputField;

const StyledForm = styled.form`
  width: 410px;
  padding: 12px 20px 12px 16px;
  position: fixed;
  bottom: 0;
  border-top: 0.5px solid #dbdbdb;
  background-color: #fff;

  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const StyledIconBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #c4c4c4;
  background: #c4c4c4 url(${(props) => props.iconimg}) no-repeat center;
  background-size: ${(props) => (props.profile === 'profile' ? 'cover' : '22px 22px')};
`;

const StyledSubmitBtn = styled.button`
  font-size: 14px;
  margin-top: 8px;

  &:disabled {
    color: #c4c4c4;
    cursor: default;
  }

  &:enabled {
    color: #3c58c1;
  }
`;
