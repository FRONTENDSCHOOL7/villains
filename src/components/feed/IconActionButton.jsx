import styled from 'styled-components';

const IconActionButton = ({ icon, count, onClick, disabled }) => {
  return (
    <ActionButton onClick={onClick} disabled={disabled}>
      <img src={icon} alt="" />
      <span>{count}</span>
    </ActionButton>
  );
};

export default IconActionButton;

const ActionButton = styled.button`
  display: flex;
  gap: 4px;
  color: #767676;
  font-size: 12px;
  line-height: 20px;
`;
