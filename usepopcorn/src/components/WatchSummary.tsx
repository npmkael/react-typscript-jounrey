import React from "react";
import { tempWatchedDataType } from "../models";

interface Props {
    watchedData: tempWatchedDataType[];
    average: (arr: number[]) => number;
}

const WatchSummary = ({ watchedData, average }: Props) => {
    const avgImdbRating: number = average(
        watchedData.map((movie) => movie.imdbRating)
    );
    const avgUserRating: number = average(
        watchedData.map((movie) => movie.userRating)
    );
    const avgRuntime: number = average(
        watchedData.map((movie) => movie.runtime)
    );

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watchedData.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    );
};

export default WatchSummary;
