import styled from 'styled-components';
import UserCard from './UserCard';

const UserListBox = ({ userList, showUserList }) => {
  // 관리자 계정 제외하고 검색결과 표시
  return (
    <StyledList showUserList={showUserList}>
      {userList
        .filter((user) => user.accountname !== 'villains')
        .map((user, idx) => (
          <UserCard key={idx} user={user} />
        ))}
    </StyledList>
  );
};

export default UserListBox;

const StyledList = styled.ul`
  /* background-color: #fff; */
  background-color: ${(props) => props.showUserList ? '#fff' : 'transparent'};
  width: 100%;
  min-height: calc(100vh - 48px - 77px);
  padding: 20px 16px;

  position: absolute;
  top: 48px;
  z-index: 10;
`;
