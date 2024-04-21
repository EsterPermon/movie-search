import styled from 'styled-components';

export const StyledMediaItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  border: 4px solid #ffa700;
  border-radius: 8px;

  a {
    text-decoration: none;
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px;
  background-color: #ffa700;
  font-weight: bold;
  color: white;
`;

export const StyledImageContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const StyedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
`;

export const ImageNotFoundStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.1);
  color: #ffa700;
  font-weight: bold;
`;
