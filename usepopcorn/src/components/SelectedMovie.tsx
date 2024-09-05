import React from "react";
import { useState, useEffect, useRef } from "react";
import { MovieDetails, tempMovieDataType } from "../models";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { tempWatchedDataType } from "../models";

interface Props {
    selectedId: string;
    onCloseMovie: () => void;
    apikey: string;
    onAddWatched: (movie: tempWatchedDataType) => void;
    watched: tempWatchedDataType[];
}

const SelectedMovie = ({
    selectedId,
    onCloseMovie,
    apikey,
    onAddWatched,
    watched,
}: Props) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [userRating, setUserRating] = useState<number>(0);

    const countRef = useRef<number>(0);

    useEffect(
        function () {
            if (userRating) countRef.current++;
        },
        [userRating]
    );

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchUserRating = watched.find(
        (movie) => movie?.imdbID === selectedId
    )?.userRating;

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

    useEffect(
        function () {
            if (!movie) return;
            document.title = `Movie | ${movie?.Title}`;

            return function () {
                document.title = "usePopcorn";
            };
        },
        [movie?.Title]
    );

    useEffect(function () {
        function callback(e: KeyboardEvent): void {
            if (e.code === "Escape") {
                onCloseMovie();
            }
        }

        document.addEventListener("keydown", callback);

        return function () {
            document.removeEventListener("keydown", callback);
        };
    }, []);

    if (isLoading || !movie) return <Loader />;

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

    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        };
        onAddWatched(newMovie);
        onCloseMovie();
    }

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
                                {imdbRating} IMDb Rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        size={26}
                                        maxRating={10}
                                        onSetRating={setUserRating}
                                    />

                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You already rated this movie{" "}
                                    {watchUserRating}⭐
                                </p>
                            )}
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
