import styled, { css } from 'styled-components';
import basicProfile from '../../assets/img/basic-profile.svg';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useFormatDate from '../../hooks/useFormatDate';

let user;

const Message = ({ data }) => {
  user = useRecoilValue(userAtom);
  const time = useFormatDate(data.createdAt);
  return (
    <MessageContainer sender={data.author.accountname}>
      {data.author.accountname === user.accountname && (
        <ProfileImage>
          {/* 프로필 기본이미지 수정 필요 */}
          {/* <img src={post.author.image} alt="" /> */}
          <img src={basicProfile} alt="" />
        </ProfileImage>
      )}
      <MessageText sender={data.author.accountname}>{data.content}</MessageText>
      <MessageTime sender={data.author.accountname}>{time}</MessageTime>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.sender !== user.accountname ? 'row-reverse' : 'row')};
  justify-content: flex-start;
  margin-bottom: 12px;
  gap: 6px;

  ${(props) => props.sender !== user.accountname && userMessageStyles}
`;

const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: #c4c4c4;
`;

const MessageText = styled.span`
  background: ${(props) => (props.sender !== user.accountname ? '#3c58c1' : '#ffffff')};
  color: ${(props) => (props.sender !== user.accountname ? '#fff' : '#000')};
  padding: 12px;
  border-radius: ${(props) => (props.sender !== user.accountname ? '16px 0 16px 16px' : '0 16px 16px 16px')};
  border: ${(props) => (props.sender === user.accountname ? '1px solid #c4c4c4' : 'none')};
  margin-bottom: 4px;
  max-width: 240px;
  width: auto;
  align-self: ${(props) => (props.sender !== user.accountname ? 'flex-end' : 'flex-start')};
  line-height: 22px;

  word-break: keep-all;
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
