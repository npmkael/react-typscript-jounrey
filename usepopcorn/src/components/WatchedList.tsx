import React from "react";
import { tempWatchedDataType } from "../models";

interface Props {
    watchedData: tempWatchedDataType[];
    onDeleteWatched: (id: string) => void;
}

function WatchedList({ watchedData, onDeleteWatched }: Props) {
    return (
        <ul className="list">
            {watchedData.map((movie) => (
                <Watched
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
}

type WatchedMovie = {
    movie: tempWatchedDataType;
    onDeleteWatched: (id: string) => void;
};

function Watched({ movie, onDeleteWatched }: WatchedMovie) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
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

                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}

export default WatchedList;
