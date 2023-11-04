import styled from 'styled-components';
import UserCard from './UserCard';

const UserListBox = ({ userList, handleClickUser }) => {

  return (
    <StyledList>
      {userList.map((user, idx) => (
        <UserCard key={idx} user={user} onClick={handleClickUser} />
      ))}
    </StyledList>
  );
};

export default UserListBox;

const StyledList = styled.ul`
  background-color: #eee;
  width: 100%;
  min-height: calc(100vh - 48px - 77px);
`;
