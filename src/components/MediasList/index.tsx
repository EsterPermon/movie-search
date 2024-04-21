import { MediasByYear } from '../../workers/types';
import { StyledMediaList, StyledYearList } from './styles';
import MediaItem from '../MediaItem';

type MediasListProps = {
  mediasGroupedByYear: MediasByYear;
};

const MediasList = (props: MediasListProps) => {
  const { mediasGroupedByYear } = props;
  const descYears = Object.keys(mediasGroupedByYear).reverse();

  return (
    <StyledYearList>
      {descYears?.map((year, i) => {
        const medias = Object.values(mediasGroupedByYear[year]);
        return (
          <div key={i}>
            <h1>{year}</h1>
            <StyledMediaList>
              {medias?.map((media) => {
                return <MediaItem key={media?.imdbID} media={media} />;
              })}
            </StyledMediaList>
          </div>
        );
      })}
    </StyledYearList>
  );
};

export default MediasList;
