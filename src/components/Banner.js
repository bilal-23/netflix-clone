import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import Button from './UI/Button';
import './Banner.scss';

const Banner = ({ fetchUrl: fetchNetflixOriginals }) => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, [])
    console.log(movie);

    const truncateString = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <header className="banner" style={
            { backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` }
        }>
            <div className="banner__wrapper">
                <div className="banner__content">
                    <h1 className="banner__name">{movie?.name || movie?.original_name}</h1>
                    <div className="banner__info"><span className="banner__rating">{movie?.vote_average * 10}% relevant</span> <span className="banner__year">{movie?.first_air_date?.substr(0, 4)}</span></div>
                    <div className="banner__overview">{truncateString(movie?.overview, 200)}</div>
                    <div className="banner__buttons">
                        <Button className="button--primary">
                            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"></path></svg>
                            Play
                        </Button>
                        <Button className="button--secondary">
                            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" ></path><path d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"></path></svg>
                            My List</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Banner;
