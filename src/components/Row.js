import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import MovieCard from './MovieCard';
import leftbutton from '../assets/leftbutton.svg'
import rightButton from '../assets/rightbutton.svg';
import './Row.scss';

const Row = ({ title, movies: movieList }) => {
    const movieRowRef = useRef();
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        setMovies(movieList);
    }, [movieList]);

    const scrollLeftHandler = () => {
        movieRowRef.current.scrollLeft -= 350;

    }
    const scrollRightHandler = () => {
        movieRowRef.current.scrollLeft += 350;

    }

    return (
        <div className="row">
            <div className="row__title">
                <h2 className="row__titleHeading">{title}</h2>
            </div>
            <div className="row__posters" ref={movieRowRef}>
                <div className="scroll__button left__button" onClick={scrollLeftHandler}><img src={leftbutton} alt="Scroll left" /></div>
                <div className="scroll__button right__button" onClick={scrollRightHandler}><img src={rightButton} alt="Scroll right" /></div>

                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Row
