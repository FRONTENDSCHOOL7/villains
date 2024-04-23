import styled from 'styled-components';
import UserCard from './UserCard';
import theme from '../../style/theme';

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
  background-color: ${(props) => props.showUserList ? '#fff' : 'transparent'};
  width: 100%;
  height: calc(100vh - 48px - 80px);
  overflow-y: auto;
  position: absolute;
  top: 48px;

  &::-webkit-scrollbar {
    width: 6px; /* 세로축 스크롤바 폭 너비 */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background-color: ${theme.color.light};
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.color.white};
  }
`;
