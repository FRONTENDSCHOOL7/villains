import styled from 'styled-components';

const Input = styled.input`
  padding: 10px 0 5px 0;
  margin-bottom: 2px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  &:focus {
    border-bottom: 1px solid #3C58C1;
  }
`;

const Label = styled.label`
  margin-top: 20px;
  font-size: 12px;
  color: #767676;
`;

export { Input, Label };
