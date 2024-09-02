export type tempMovieDataType = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

export type tempWatchedDataType = {
    runtime: number;
    imdbRating: number;
    userRating: number;
    imdbID: string;
    title: string;
    year: string;
    poster: string;
};

type Ratings = {
    Source: string;
    Value: string;
};

export type MovieDetails = {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Production: string;
    Rated: string;
    Ratings: Ratings[];
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Website: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
};
