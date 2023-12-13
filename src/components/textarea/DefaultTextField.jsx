import styled from 'styled-components';
import ResizingTextarea from './ResizingTextarea';

const DefaultTextField = ({
  handleTextFieldSubmit,
  iconImg,
  handleIconBtnClick,
  placeholderContent,
  submitText,
  text,
  setText
}) => {

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleTextFieldSubmit}>
      <IconBtn iconImg={iconImg} onClick={handleIconBtnClick} />
      <ResizingTextarea rows="1" placeholder={placeholderContent} onChange={handleTextChange} value={text} />
      <SubmitBtn disabled={!text}>{submitText}</SubmitBtn>
    </StyledForm>
  );
};

export default DefaultTextField;

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

const IconBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid #dbdbdb;
  background: url(${(props) => props.iconImg}) no-repeat center / cover;
`;

const SubmitBtn = styled.button`
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
