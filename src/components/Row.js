import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import leftbutton from '../assets/leftbutton.svg'
import rightButton from '../assets/rightbutton.svg';
import axios from '../axios/axios';
import './Row.scss';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const movieRowRef = useRef();
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

    const scrollLeftHandler = () => {
        movieRowRef.current.scrollLeft -= 500;

    }
    const scrollRightHandler = () => {
        movieRowRef.current.scrollLeft += 500;

    }

    return (
        <div className="row">
            <div className="row__title">
                <h2 className="row__titleHeading">{title}</h2>
            </div>
            <div className="row__posters" ref={movieRowRef}>
                <div className="scroll__button left__button" onClick={scrollLeftHandler}><img src={leftbutton} alt="Scroll left" /></div>
                <div className="scroll__button right__button" onClick={scrollRightHandler}><img src={rightButton} alt="Scroll right" /></div>
                {movies.map(movie => <img key={movie.id} className={`row__poster`} src={`${image_url}${movie.poster_path}`} />)}
            </div>
        </div>
    )
}

export default Row
