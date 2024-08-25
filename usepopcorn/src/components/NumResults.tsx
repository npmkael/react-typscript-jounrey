import React from "react";
import { tempMovieDataType } from "../tempMovieModel";

interface Props {
  movie: tempMovieDataType[];
}

function NumResults({ movie }: Props) {
  return (
    <p className="num-results">
      Found <strong>{movie.length}</strong> results
    </p>
  );
}

export default NumResults;
