import React from "react";
import { useState } from "react";
import { tempMovieDataType } from "../tempMovieModel";
import { tempWatchedDataType } from "../tempWatchMovieModel";

interface Props {
  tempMovieData: tempMovieDataType[];
  tempWatchedData: tempWatchedDataType[];
}

function average(arr: number[]): number {
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

const MovieBox = ({ tempMovieData, tempWatchedData }: Props) => {
  console.log(tempMovieData);
  return (
    <main className="main">
      <ListBox movieData={tempMovieData} />
      <WatchBox watchedData={tempWatchedData} />
    </main>
  );
};

interface MovieDataProps {
  movieData: tempMovieDataType[];
}

function ListBox({ movieData }: MovieDataProps) {
  console.log(movieData);

  const [isOpen1, setIsOpen1] = useState<boolean>(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList movieData={movieData} />}
    </div>
  );
}

function MovieList({ movieData }: MovieDataProps) {
  return (
    <ul className="list">
      {movieData?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

type MovieProps = {
  movie: tempMovieDataType;
};

function Movie({ movie }: MovieProps) {
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

interface WatchBoxProps {
  watchedData: tempWatchedDataType[];
}

function WatchBox({ watchedData }: WatchBoxProps) {
  const [watched, setWatched] = useState<tempWatchedDataType[]>(watchedData);
  const [isOpen2, setIsOpen2] = useState<boolean>(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchSummary watchedData={watched} />
          <WatchedList watchedData={watched} />
        </>
      )}
    </div>
  );
}

function WatchSummary({ watchedData }: WatchBoxProps) {
  const avgImdbRating: number = average(
    watchedData.map((movie) => movie.imdbRating)
  );
  const avgUserRating: number = average(
    watchedData.map((movie) => movie.userRating)
  );
  const avgRuntime: number = average(watchedData.map((movie) => movie.runtime));

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
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watchedData }: WatchBoxProps) {
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

export default MovieBox;
