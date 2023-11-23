import styled from 'styled-components';
import profileImage from '../../assets/img/basic-profile.svg';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';
import { useRecoilState } from 'recoil';
import queryAtom from '../../atoms/queryAtom';

const UserCard = ({ user }) => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const navigate = useNavigate();

  const handleProfileNav = () => {
    // TODO : 다른유저 프로필 작업 완료되면 경로 변경
    setQuery("");
    navigate(pageUrlConfig.profilePage);
  };

  return (
    <StyledUserCard onClick={handleProfileNav}>
      <ProfileImage>
        {/* 프로필 기본이미지 수정 필요 */}
        {/* <img src={user.image} alt="" /> */}
        <img src={profileImage} alt="" />
      </ProfileImage>
      <UserInfo>
        <UserName>{user.username}</UserName>
        <Accountname>@ {user.accountname}</Accountname>
      </UserInfo>
    </StyledUserCard>
  );
};

export default UserCard;

const StyledUserCard = styled.li`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
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

const Accountname = styled.span`
  display: block;
  color: #767676;
  font-size: 12px;
`;
