import { SearchType } from '../../workers/types';
import { API_KEY, BASE_URL } from './constants';
import type { MediaDetailsInfo, MediaPagination } from './types';

export const fetchMediasByTitle = async (title: string, type: SearchType, page: number): Promise<MediaPagination> => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&type=${type}&s=${title}&page=${page}`);
  return response.json();
};

export const fetchMediaByImdbId = async (imdbId: string): Promise<MediaDetailsInfo> => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbId}`);
  return response.json();
};
