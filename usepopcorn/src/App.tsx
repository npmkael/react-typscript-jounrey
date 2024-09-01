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

const KEY = "fa23eaa3";

function average(arr: number[]): number {
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

function App() {
    const [query, setQuery] = useState<string>("");
    const [movies, setMovies] = useState<tempMovieDataType[]>([]);
    const [watched, setWatched] = useState<tempWatchedDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    /*
    // will only render 1 time
    useEffect(function () {
        console.log("After initial render");
    }, []);

    // this renders after every render since we didn't pass any dependency array
    useEffect(function () {
        console.log("After render");
    });

    useEffect(
        function () {
            console.log("D");
        },
        [query]
    );
    */

    // this render after the component re-renders
    // console.log("During render");

    // useEffect for data fetching
    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(
                        `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
                    );

                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );

                    const data = await res.json();
                    console.log(data);
                    if (data.Response === "False")
                        throw new Error("Movie not found");

                    setMovies(data.Search);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }

            if (!query.length) {
                setMovies([]);
                setError("");
                return;
            }

            fetchMovies();
        },
        [query]
    );

    return (
        <>
            <NavBar query={query} setQuery={setQuery} movie={movies} />
            <MovieBox>
                <Box>
                    {/* {isLoading ? <Loader /> : <MovieList movieData={movies} />} */}
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movieData={movies} />}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    <WatchSummary watchedData={watched} average={average} />
                    <WatchedList watchedData={watched} />
                </Box>
            </MovieBox>
        </>
    );
}

export default App;
