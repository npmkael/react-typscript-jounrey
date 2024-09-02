import React from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";

type Props = {
    movie: tempMovieDataType;
    onSelectMovie: (id: string) => void;
};

function Movie({ movie, onSelectMovie }: Props) {
    const { Poster: poster, Title: title, Year: year } = movie;

    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={poster} alt={`${title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{year}</span>
                </p>
            </div>
        </li>
    );
}

export default Movie;
