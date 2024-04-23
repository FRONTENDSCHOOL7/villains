import styled from 'styled-components';
import basicProfile from '../../assets/img/basic-profile.svg';

const ChatItem = (args) => {
  const date = new Date(args.createdAt);
  return (
    <StyledUserHeader>
      <ProfileImage>
        <img src={basicProfile} alt="" />
      </ProfileImage>
      <UserInfo>
        <UserName>{args.title}</UserName>
        <Contents>배달 수락자 : {args.acceptUser}</Contents>
      </UserInfo>
      <DateText>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</DateText>
    </StyledUserHeader>
  );
};

export default ChatItem;

const StyledUserHeader = styled.li`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #dbdbdb;
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
  max-width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled(Contents)`
  font-size: 10px;
  align-self: flex-end;
`;
