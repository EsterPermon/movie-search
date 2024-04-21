export type Media = {
  Poster: string;
  Title: string;
  Type: string;
  imdbID: string;
  Year: string;
};

type MediaError = {
  Response: 'False';
  Error: string;
};

type MediaSuccess = {
  Search: Media[];
  totalResults: string;
  Response: 'True';
};

export type MediaPagination = MediaError | MediaSuccess;

type RatingType = {
  Source: string;
  Value: string;
};

export type MediaDetailsSuccess = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingType[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: 'True';
};

export type MediaDetailsInfo = MediaError | MediaDetailsSuccess;
