import React from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";
import Movie from "./Movie";

interface MovieDataProps {
    movieData: tempMovieDataType[] | tempWatchedDataType[];
}

function MovieList({ movieData }: MovieDataProps) {
    return (
        <ul className="list">
            {movieData?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

export default MovieList;
