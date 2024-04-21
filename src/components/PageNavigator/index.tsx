import React from 'react';
import Button from '../UI/Button';
import PageNavigatorStyles from './styles';
import { PaginationContext } from '../../contexts/PaginationContext';
import translate from '../../locales/i18n';

const PageNavigator = () => {
  const {
    isFetchingMedias,
    errorFetchingMedias,
    hasPreviousPage,
    hasNextPage,
    setNextPage,
    setPreviousPage,
    currentPage,
    totalPages,
  } = React.useContext(PaginationContext);

  return (
    <>
      {isFetchingMedias || errorFetchingMedias ? null : (
        <PageNavigatorStyles>
          {hasPreviousPage ? (
            <Button label={translate('pageNavigator.prevButton.label')} onClick={setPreviousPage} />
          ) : null}
          {totalPages > 0 ? (
            <div>{translate('pageNavigator.pageNumber', { curr: currentPage, total: totalPages })}</div>
          ) : null}
          {hasNextPage ? <Button label={translate('pageNavigator.nextButton.label')} onClick={setNextPage} /> : null}
        </PageNavigatorStyles>
      )}
    </>
  );
};

export default PageNavigator;
