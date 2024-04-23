import styled from 'styled-components';
import { useNavigate } from 'react-router';
import pageUrlConfig from '../../config/pageUrlConfig';
import { useRecoilState } from 'recoil';
import queryAtom from '../../atoms/queryAtom';

const UserCard = ({ user }) => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const navigate = useNavigate();

  const handleProfileNav = () => {
    setQuery('');
    navigate(`${pageUrlConfig.profilePage}/${user.accountname}`);
  };

  return (
    <StyledUserCard onClick={handleProfileNav}>
      <ProfileImage
        src={
          user.image === 'http://146.56.183.55:5050/Ellipse.png'
            ? 'https://api.mandarin.weniv.co.kr/Ellipse.png'
            : user.image
        }
        alt=""
      />
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
  cursor: pointer;
  padding: 8px 16px;


  &:hover {
    background-color: #f2f2f2;
  }
`;

const ProfileImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #c4c4c4;
  border: 0.5px solid #c4c4c4;
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
