import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import './Row.scss';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const image_url = `https://image.tmdb.org/t/p/original/`;

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    console.log(title, movies)
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie => <img key={movie.id} className={`row__poster`} src={`${image_url}${movie.poster_path}`} />)}
            </div>
        </div>
    )
}

export default Row
