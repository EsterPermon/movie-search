import React from 'react';
import { Media } from '../api/medias/types';
import { MediasByYear, SearchType, WorkerEventType } from '../workers/types';

export type PaginationContextType = {
  groupedMediasPage: MediasByYear;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFetchingMedias: boolean;
  currentPage: number;
  totalPages: number;
  errorFetchingMedias: string;
  mediasCount: number;
  submitSearch: (term: string, type: SearchType) => void;
  setNextPage: () => void;
  setPreviousPage: () => void;
};

const defaultValue = {
  groupedMediasPage: {},
  hasNextPage: false,
  hasPreviousPage: false,
  isFetchingMedias: false,
  currentPage: 0,
  totalPages: 0,
  errorFetchingMedias: '',
  mediasCount: 0,
  submitSearch: () => null,
  setNextPage: () => null,
  setPreviousPage: () => null,
};

export const PaginationContext = React.createContext<PaginationContextType>(defaultValue);

export const PaginationProvider = ({ children }: { children?: React.ReactElement }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const hasPreviousPage = React.useMemo(() => 1 < currentPage, [currentPage]);
  const hasNextPage = React.useMemo(() => currentPage < totalPages, [currentPage, totalPages]);

  const [isFetchingMedias, setIsFetchingMedias] = React.useState(false);
  const [errorFetchingMedias, setErrorFetchingMedias] = React.useState('');
  const [allMediasSorted, setAllMediasSorted] = React.useState<Media[]>([]);
  const [mediasCount, setMediasCount] = React.useState(0);
  const [groupedMediasPage, setGroupedMediasPage] = React.useState<MediasByYear>({});

  const [worker, setWorker] = React.useState<Worker>();

  const setPreviousPage = React.useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage((prevState) => prevState - 1);
    }
  }, [hasPreviousPage]);

  const setNextPage = React.useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prevState) => prevState + 1);
    }
  }, [hasNextPage]);

  const submitSearch = React.useCallback(
    (term: string, type: SearchType) => {
      if (worker && term) {
        setIsFetchingMedias(true);
        setErrorFetchingMedias('');
        setAllMediasSorted([]);
        setMediasCount(0);
        setGroupedMediasPage({});
        setCurrentPage(1);
        worker.postMessage({ type: 'searchMedias', payload: { term, type } });
      }
    },
    [worker]
  );

  React.useEffect(() => {
    if (!isFetchingMedias && allMediasSorted?.length > 0 && worker) {
      worker.postMessage({ type: 'loadPage', payload: { currentPage, allMediasSorted: allMediasSorted } });
    }
  }, [isFetchingMedias, allMediasSorted, currentPage, worker]);

  React.useEffect(() => {
    // Assemble the full URL to the worker.ts, relative to this file
    const myWorker = new Worker(new URL('../workers/worker.ts', import.meta.url));

    myWorker.onmessage = (event: MessageEvent<WorkerEventType>) => {
      // console.log('Received result from worker:', event.data);

      const { type, payload } = event.data;

      switch (type) {
        case 'allMedias': {
          setAllMediasSorted(payload?.allMediasSorted);
          setMediasCount(payload?.allMediasSorted.length);
          setTotalPages(payload?.totalPages);
          setIsFetchingMedias(false);
          break;
        }
        case 'pageMedias': {
          setGroupedMediasPage(payload);
          break;
        }
        case 'error': {
          setErrorFetchingMedias(payload);
          setIsFetchingMedias(false);
          break;
        }
        default:
          break;
      }
    };

    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  const memoizedValue = React.useMemo(() => {
    return {
      groupedMediasPage,
      hasPreviousPage,
      hasNextPage,
      currentPage,
      totalPages,
      errorFetchingMedias,
      isFetchingMedias,
      mediasCount,
      submitSearch,
      setNextPage,
      setPreviousPage,
    };
  }, [
    currentPage,
    totalPages,
    groupedMediasPage,
    hasPreviousPage,
    hasNextPage,
    errorFetchingMedias,
    isFetchingMedias,
    mediasCount,
    submitSearch,
    setNextPage,
    setPreviousPage,
  ]);

  return <PaginationContext.Provider value={memoizedValue}>{children}</PaginationContext.Provider>;
};
