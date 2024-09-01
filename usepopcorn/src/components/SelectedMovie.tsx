import React from "react";
import { useState, useEffect } from "react";
import { MovieDetails } from "../models";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

interface Props {
    selectedId: string;
    onCloseMovie: () => void;
    apikey: string;
}

const SelectedMovie = ({ selectedId, onCloseMovie, apikey }: Props) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(
        function () {
            async function getMovieDetails() {
                try {
                    setIsLoading(true);
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${apikey}&i=${selectedId}`
                    );

                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movie"
                        );

                    const data = await res.json();

                    if (data.Response === "False")
                        throw new Error("Movie details not found");

                    setMovie(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
            getMovieDetails();
        },
        [selectedId]
    );

    if (!movie) return;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    console.log(title, year, poster);

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading && !error && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`${movie}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating}
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            <StarRating size={26} maxRating={10} />
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

export default SelectedMovie;
