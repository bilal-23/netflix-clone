import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Banner from './Banner';
import Row from './Row';
import Loading from './UI/Loading';
import './Homescreen.scss';

const Homescreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const movies = useSelector(state => state.movies);
    const bannerMovie = movies.netflixOriginals[Math.floor(Math.random() * movies.netflixOriginals.length - 1)]
    return (
        <div className="homescreen">

            <Banner bannerMovie={bannerMovie} />
            <div className="rows">
                <Row title="Netflix Originals" mediaType="tv" movies={movies.netflixOriginals} />
                <Row title="trending now" mediaType="" movies={movies.trending} />
                <Row title="top rated" mediaType="movie" movies={movies.topRated} />
                <Row title="action movies" mediaType="movie" movies={movies.action} />
                <Row title="comedy movies" mediaType="movie" movies={movies.comedy} />
                <Row title="horror movies" mediaType="movie" movies={movies.horror} />
                <Row title="romance movies" mediaType="movie" movies={movies.romance} />
                <Row title="documentaries" mediaType="movie" movies={movies.documentaries} />
            </div>
        </div>
    )
}

export default Homescreen;
