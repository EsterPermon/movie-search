import { fetchMediasByTitle } from '../api/medias';
import { Media } from '../api/medias/types';
import { ITEMS_PER_PAGE, MainThreadEventType, MediasByYear, OMDB_API_ITEMS_PER_PAGE, SearchType } from './types';

onmessage = async (event: MessageEvent<MainThreadEventType>) => {
  // console.log('Received message from the main thread:', event.data);

  const { type, payload } = event.data;

  switch (type) {
    case 'searchMedias': {
      try {
        const result = await searchByTerm(payload.term, payload.type);
        const totalPages = Math.floor(result?.length / ITEMS_PER_PAGE) + 1;
        postMessage({ type: 'allMedias', payload: { allMediasSorted: result, totalPages } });
      } catch (error) {
        if (error instanceof Error) {
          postMessage({ type: 'error', payload: error.message });
        }
      }
      break;
    }
    case 'loadPage': {
      const groupedMedias = loadMediasPage(payload.currentPage, payload.allMediasSorted);
      postMessage({ type: 'pageMedias', payload: groupedMedias });
      break;
    }
    default:
      break;
  }
};

const searchByTerm = async (searchTerm: string, searchType: SearchType) => {
  const mediasData = await fetchMediasByTitle(searchTerm, searchType, 1);

  if (mediasData.Response === 'True') {
    const mediasCount = parseInt(mediasData.totalResults);
    // calculates how many fetches will be necessary to retrieve all records
    const fetchesAmount = Math.floor(mediasCount / OMDB_API_ITEMS_PER_PAGE) + 1;

    return fetchAndSortMedias(fetchesAmount, searchTerm, searchType);
  }
  throw new Error(mediasData.Error);
};

const fetchAndSortMedias = async (fetchesAmount: number, searchTerm: string, searchType: SearchType) => {
  const allMedias: Media[] = [];

  // Run all necessary fetches until all records are retrieved
  for (let i = 1; i <= fetchesAmount; i++) {
    const mediasData = await fetchMediasByTitle(searchTerm, searchType, i);

    if (mediasData.Response === 'True') {
      const medias = mediasData?.Search || [];
      allMedias.push(...medias);
    }
  }
  const sortedMedias = allMedias.sort(sortByYearAndTitle);
  return sortedMedias;
};

const getYear = (year: string) => {
  return year.slice(0, 4);
};

const sortByYearAndTitle = (mediaA: Media, mediaB: Media) => {
  const mediaAYear = getYear(mediaA.Year);
  const mediaBYear = getYear(mediaB.Year);

  if (mediaAYear === mediaBYear) {
    return mediaA.Title < mediaB.Title ? -1 : 1;
  }
  return mediaAYear > mediaBYear ? -1 : 1;
};

const loadMediasPage = (currPage: number, allItemsSorted: Media[]) => {
  const startIndex = (currPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const itemsPage = allItemsSorted.slice(startIndex, endIndex);
  return groupItemsByYear(itemsPage);
};

// Given a media array already sorted, group it by year
const groupItemsByYear = (items: Media[]): MediasByYear => {
  return items?.reduce((accumulator: MediasByYear, item: Media) => {
    const year = getYear(item.Year);

    const imdbId = item?.imdbID;
    if (!accumulator[year]) {
      accumulator[year] = {};
    }
    accumulator[year][imdbId] = item;
    return accumulator;
  }, {});
};

export {};
