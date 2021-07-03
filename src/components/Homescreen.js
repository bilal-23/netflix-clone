import React, { useState } from 'react';
import Banner from './Banner';
import Row from './Row';
import Loading from './UI/Loading';
import './Homescreen.scss';
import { useEffect } from 'react';

const Homescreen = ({ movies }) => {
    const bannerMovie = movies?.netflixOriginals?.results[Math.floor(Math.random() * movies?.netflixOriginals?.results?.length - 1)];
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1000)

        return (() => clearTimeout(timer))
    }, [])


    return (
        <>
            {initialLoading && <Loading />}
            <div className="homescreen" style={{ opacity: !initialLoading && '1' }}>
                <Banner bannerMovie={bannerMovie} />
                {movies && <div className="rows">
                    <Row title="Netflix Originals" mediaType="tv" movies={movies?.netflixOriginals?.results} />
                    <Row title="trending now" mediaType=""
                        movies={movies?.trending?.results} />
                    <Row title="top rated" mediaType="movie"
                        movies={movies?.topRated?.results} />
                    <Row title="action movies" mediaType="movie"
                        movies={movies?.action?.results} />
                    <Row title="comedy movies" mediaType="movie"
                        movies={movies?.comedy?.results} />
                    <Row title="horror movies" mediaType="movie"
                        movies={movies?.horror?.results} />
                    <Row title="romance movies" mediaType="movie"
                        movies={movies?.romance?.results} />
                    <Row title="documentaries" mediaType="movie"
                        movies={movies?.documentaries?.results} />
                </div>}
            </div>
        </>
    )
}

export default Homescreen;
