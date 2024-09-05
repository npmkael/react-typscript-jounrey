import React from "react";
import { useEffect, useState } from "react";
import { tempMovieDataType } from "./models";

const KEY = "fa23eaa3";

type useMoviesArgs = string;

export const useMovies = (query: useMoviesArgs) => {
    const [movies, setMovies] = useState<tempMovieDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(
                        `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );

                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );

                    const data = await res.json();
                    if (data.Response === "False")
                        throw new Error("Movie not found");

                    setMovies(data.Search);
                    setError("");
                } catch (err: any) {
                    if (err.name !== "AbortError") {
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (!query.length) {
                setMovies([]);
                setError("");
                return;
            }

            // handleCloseMovie();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
};
