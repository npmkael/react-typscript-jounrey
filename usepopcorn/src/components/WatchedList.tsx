import React from "react";
import { tempWatchedDataType } from "../models";

interface Props {
    watchedData: tempWatchedDataType[];
}

function WatchedList({ watchedData }: Props) {
    return (
        <ul className="list">
            {watchedData.map((movie) => (
                <Watched movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

type WatchedMovie = {
    movie: tempWatchedDataType;
};

function Watched({ movie }: WatchedMovie) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}

export default WatchedList;
