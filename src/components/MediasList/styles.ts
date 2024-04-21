import styled from 'styled-components';

export const StyledYearList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const StyledMediaList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
`;
