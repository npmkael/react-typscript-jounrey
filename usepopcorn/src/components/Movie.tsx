import React from "react";
import { tempMovieDataType, tempWatchedDataType } from "../models";

type Props = {
    movie: tempMovieDataType | tempWatchedDataType;
};

function Movie({ movie }: Props) {
    return (
        <li>
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
