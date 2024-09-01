import React from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";

type Props = {
    movie: tempMovieDataType | tempWatchedDataType;
    onSelectMovie: (id: string) => void;
};

function Movie({ movie, onSelectMovie }: Props) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

export default Movie;
