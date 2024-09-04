import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MovieBox from "./components/MovieBox";
import { tempMovieDataType, tempWatchedDataType } from "./models";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import WatchSummary from "./components/WatchSummary";
import WatchedList from "./components/WatchedList";
import MovieList from "./components/MovieList";
import SelectedMovie from "./components/SelectedMovie";

const KEY = "fa23eaa3";

function average(arr: number[]): number {
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

// TODO
// Review all the new code, before proceeding to lesson 164
// Review all handling nulls and undefined

function App() {
    const [query, setQuery] = useState<string>("");
    const [movies, setMovies] = useState<tempMovieDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string>("");

    // const [watched, setWatched] = useState<tempWatchedDataType[]>([]);
    const [watched, setWatched] = useState<tempWatchedDataType[] | null>(
        function (): tempWatchedDataType[] | null {
            const storedValue = localStorage.getItem("watch");
            return typeof storedValue === "undefined" || storedValue === null
                ? null
                : (JSON.parse(storedValue) as tempWatchedDataType[]);
        }
    );

    function handleSelectMovie(id: string): void {
        setSelectedId((selectedId) => (id === selectedId ? "" : id));
    }

    function handleCloseMovie(): void {
        setSelectedId("");
    }

    function handleAddWatched(movie: tempWatchedDataType): void {
        setWatched((watched) => (watched ? [...watched, movie] : []));
    }

    function handleDeleteWatched(id: string): void {
        setWatched((watched) =>
            watched ? watched.filter((movie) => movie.imdbID !== id) : []
        );
    }

    useEffect(
        function () {
            localStorage.setItem("watch", JSON.stringify(watched));
        },
        [watched]
    );

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

            handleCloseMovie();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <>
            <NavBar query={query} setQuery={setQuery} movie={movies} />
            <MovieBox>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movieData={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedId ? (
                        <SelectedMovie
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            apikey={KEY}
                            onAddWatched={handleAddWatched}
                            watched={watched ? watched : []}
                        />
                    ) : (
                        <>
                            <WatchSummary
                                watchedData={watched ? watched : []}
                                average={average}
                            />
                            <WatchedList
                                watchedData={watched ? watched : []}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </MovieBox>
        </>
    );
}

export default App;
