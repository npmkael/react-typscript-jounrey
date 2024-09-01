import React from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";
import Movie from "./Movie";

interface Props {
    movieData: tempMovieDataType[] | tempWatchedDataType[];
    onSelectMovie: (id: string) => void;
}

function MovieList({ movieData, onSelectMovie }: Props) {
    return (
        <ul className="list list-movies">
            {movieData?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}

export default MovieList;
