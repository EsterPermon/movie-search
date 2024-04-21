import React from 'react';
import InputSearch from '../../components/InputSearch';
import MediasList from '../../components/MediasList';
import { PaginationContext } from '../../contexts/PaginationContext';
import PageNavigator from '../../components/PageNavigator';
import MediasPageStyles from './styles';
import translate from '../../locales/i18n';

const Medias = () => {
  const { errorFetchingMedias, isFetchingMedias, groupedMediasPage, mediasCount, submitSearch } =
    React.useContext(PaginationContext);

  return (
    <MediasPageStyles>
      <InputSearch handleOnClick={submitSearch} />
      {mediasCount ? <h3> {translate('resultsFound', { count: mediasCount })}</h3> : null}
      <PageNavigator />
      {errorFetchingMedias ? <h1 id="error">{errorFetchingMedias}</h1> : null}
      {isFetchingMedias ? (
        <h1 id="loading">{translate('loadingMessage')}</h1>
      ) : (
        <MediasList mediasGroupedByYear={groupedMediasPage} />
      )}
      <PageNavigator />
    </MediasPageStyles>
  );
};

export default Medias;
