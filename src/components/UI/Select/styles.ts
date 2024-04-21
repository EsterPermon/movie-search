import styled from 'styled-components';

export const StyledSelect = styled.select`
  display: flex;
  padding: 0 4px;
  font-weight: bold;
  border: none;
  font-size: 16px;
  outline: none;
  width: 100px;
  background-color: #ffa700;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledOption = styled.option`
  font-weight: bold;
`;
