import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import "./SimilarMovies.scss";

const SimilarMovies = ({ similarMovies, mediaType, imageIsLoaded }) => {
    return (
        <div className="similar__movies" style={{ opacity: imageIsLoaded && '1', display: imageIsLoaded && 'block' }}>
            <p className="similar__movies__heading">Similar</p>
            <div className="similar__movies__list">
                {similarMovies?.map(movie => <Link to={`/${mediaType}/${movie?.id}`} key={movie?.id}>
                    <MovieCard key={movie?.id} movie={movie} />
                </Link>)}
            </div>
        </div>
    )
}

export default SimilarMovies
