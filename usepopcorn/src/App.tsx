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
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

const KEY = "fa23eaa3";

function App() {
    const [query, setQuery] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string>("");

    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorage<tempWatchedDataType[]>(
        [],
        "watch"
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

    function average(arr: number[]): number {
        return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
    }

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
