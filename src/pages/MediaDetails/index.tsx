import React from 'react';
import MediaDetailsStyles from './styles';
import { fetchMediaByImdbId } from '../../api/medias';
import { MediaDetailsSuccess } from '../../api/medias/types';
import { useParams } from 'react-router-dom';

const MediaDetails = () => {
  const { imdbId } = useParams();
  const [mediaDetails, setMediaDetails] = React.useState<MediaDetailsSuccess>();
  const [errorFetchingDetails, setErrorFetchingDetails] = React.useState('');

  React.useEffect(() => {
    if (imdbId) {
      fetchMediaByImdbId(imdbId).then((mediaData) => {
        if (mediaData?.Response === 'True') {
          setMediaDetails(mediaData);
        } else {
          setErrorFetchingDetails(mediaData.Error);
        }
      });
    }
  }, [imdbId]);

  const renderMediaDetails = (details: MediaDetailsSuccess) => {
    const { Title, Ratings, Poster, ...furtherDetails } = details;
    return (
      <div>
        {Title ? <h1>{Title}</h1> : null}
        {Poster ? <img src={Poster} alt={Title} /> : null}
        <div>
          {Object.entries(furtherDetails).map(([prop, value], i) => {
            return (
              <div key={i}>
                <span>{prop}: </span> {value}
              </div>
            );
          })}
          {Ratings ? (
            <>
              <span>Ratings:</span>
              <ul>
                {Ratings?.map((rate, i) => {
                  return (
                    <li key={i}>
                      <span>{rate?.Source}: </span> {rate?.Value}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <MediaDetailsStyles>
      {errorFetchingDetails ? <h1 id="error">{errorFetchingDetails}</h1> : null}
      {mediaDetails ? renderMediaDetails(mediaDetails) : null}
    </MediaDetailsStyles>
  );
};

export default MediaDetails;
