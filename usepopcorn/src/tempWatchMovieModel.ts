import { tempMovieDataType } from "./tempMovieModel";

export interface tempWatchedDataType extends tempMovieDataType {
  runtime: number;
  imdbRating: number;
  userRating: number;
}
