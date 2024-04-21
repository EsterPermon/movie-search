import { Media } from '../api/medias/types';

export const ITEMS_PER_PAGE = 20;
export const OMDB_API_ITEMS_PER_PAGE = 10;

export type MediasByYear = Record<string, Record<string, Media>>;
export type SearchType = '' | 'movie' | 'series';

type SearchMedias = { type: 'searchMedias'; payload: { term: string; type: SearchType } };
type LoadPage = { type: 'loadPage'; payload: { currentPage: number; allMediasSorted: Media[] } };
export type MainThreadEventType = SearchMedias | LoadPage;

type SendAllMedias = { type: 'allMedias'; payload: { allMediasSorted: Media[]; totalPages: number } };
type SendPageMedias = { type: 'pageMedias'; payload: MediasByYear };
type ReportError = { type: 'error'; payload: string };
export type WorkerEventType = SendAllMedias | SendPageMedias | ReportError;
