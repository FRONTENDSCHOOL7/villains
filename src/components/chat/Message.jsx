import styled, { css } from 'styled-components';
import basicProfile from '../../assets/img/basic-profile.svg';

const Message = ({ data }) => {
  return (
    <MessageContainer sender={data.sender}>
      {data.sender !== 'user' && (
        <ProfileImage>
          {/* 프로필 기본이미지 수정 필요 */}
          {/* <img src={post.author.image} alt="" /> */}
          <img src={basicProfile} alt="" />
        </ProfileImage>
      )}
      <MessageText sender={data.sender}>{data.text}</MessageText>
      <MessageTime sender={data.sender}>{data.time}</MessageTime>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.sender === 'user' ? 'row-reverse' : 'row')};
  justify-content: flex-start;
  margin-bottom: 12px;
  gap: 6px;

  ${(props) => props.sender === 'user' && userMessageStyles}
`;

const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: #c4c4c4;
`;

const MessageText = styled.span`
  background: ${(props) => (props.sender === 'user' ? '#3c58c1' : '#ffffff')};
  color: ${(props) => (props.sender === 'user' ? '#fff' : '#000')};
  padding: 12px;
  border-radius: ${(props) => (props.sender === 'user' ? '16px 0 16px 16px' : '0 16px 16px 16px')};
  border: ${(props) => (props.sender !== 'user' ? '1px solid #c4c4c4' : 'none')};
  margin-bottom: 4px;
  max-width: 240px;
  width: auto;
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
  line-height: 22px;

  word-break: break-word;
  display: flex;
`;

const MessageTime = styled.span`
  font-size: 12px;
  color: #767676;

  align-self: flex-end;
  margin-bottom: 8px;
`;

const userMessageStyles = css`
  /* background-color: #3c58c1; */
  color: #fff;
  border: none;
  border-radius: 16px 0 16px 16px;
`;
