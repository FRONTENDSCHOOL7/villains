import styled from 'styled-components';
import basicProfile from '../../assets/img/basic-profile.svg';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';

const ChatListItem = ({ image, username, content, date }) => {
  const navigate = useNavigate();

  const handleChatDetailNav = () => {
    navigate(`${pageUrlConfig.chatPage}/123123`);
  };
  
  return (
    <StyledUserHeader onClick={handleChatDetailNav}>
      <ProfileImage>
        {/* 프로필 기본이미지 수정 필요 */}
        {/* <img src={post.author.image} alt="" /> */}
        <img src={basicProfile} alt="" />
      </ProfileImage>
      <UserInfo>
        <UserName>{username || '애월읍 위니브 감귤농장'}</UserName>
        <Contents>{content || '이번에 정정 언제하맨마씸?'}</Contents>
      </UserInfo>
      <DateText>{date || '2020.10.25'}</DateText>
    </StyledUserHeader>
  );
};

export default ChatListItem;

const StyledUserHeader = styled.li`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #c4c4c4;
`;

const UserInfo = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
`;

const UserName = styled.span`
  display: block;
`;

const Contents = styled.span`
  display: block;
  color: #767676;
  font-size: 12px;
`;

const DateText = styled(Contents)`
  font-size: 10px;
  align-self: flex-end;
`;
