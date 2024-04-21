import { useNavigate } from 'react-router-dom';
import { Media } from '../../api/medias/types';
import { ImageNotFoundStyled, StyedImage, StyledImageContainer, StyledMediaItem, StyledTitle } from './styles';

type MediaItemProps = {
  media: Media;
};
const MediaItem = (props: MediaItemProps) => {
  const { media } = props;
  const hasPoster = media.Poster && media.Poster !== 'N/A';
  const imdbLink = `https://www.imdb.com/title/${media.imdbID}`;
  const navigate = useNavigate();

  const handleOnClick = (imdbId: string) => {
    navigate(`/medias/${imdbId}`);
  };

  return (
    <StyledMediaItem>
      <StyledTitle>
        {media?.Title}&nbsp;
        <a href={imdbLink} target="_blank" rel="noreferrer">
          (imdb)
        </a>
      </StyledTitle>
      <StyledImageContainer onClick={() => handleOnClick(media.imdbID)}>
        {hasPoster ? (
          <StyedImage src={media?.Poster} alt={media?.Title}></StyedImage>
        ) : (
          <ImageNotFoundStyled>Image not found!</ImageNotFoundStyled>
        )}
      </StyledImageContainer>
    </StyledMediaItem>
  );
};

export default MediaItem;
