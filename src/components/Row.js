import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import leftbutton from '../assets/leftbutton.svg'
import rightButton from '../assets/rightbutton.svg';
import './Row.scss';

const Row = ({ title, mediaType, movies }) => {
    const movieRowRef = useRef();

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

                {movies.map(movie => <Link key={movie.id} to={`/${mediaType || movie?.media_type}/${movie.id}`}> <MovieCard key={movie.id} movie={movie} /></Link>)}
            </div>
        </div>
    )
}

export default Row
