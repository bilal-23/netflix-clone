import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import requests from '../axios/Request';
import Button from './UI/Button';
import './Banner.scss';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, [])


    const truncateString = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <header className="banner" style={
            { backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` }
        }>

            <div className="banner__contents">
                <h1 className="banner__title">{movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <Button className="banner__button">Play</Button>
                    <Button className="banner__button">My List</Button>
                </div>
                <h2 className="banner__description">
                    {truncateString(`${movie?.overview}`, 150)}
                </h2>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;
