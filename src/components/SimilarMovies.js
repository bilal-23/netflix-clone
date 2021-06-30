import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import "./SimilarMovies.scss";

const SimilarMovies = ({ similarMovies, mediaType, setCastArray, setSimilarMoviesArray }) => {
    const history = useHistory();

    const redirectToSimilarMovie = (id) => {
        setCastArray([]);
        setSimilarMoviesArray([]);
        history.push(`/${mediaType}/${id}`)
    }

    return (
        <div className="similar__movies">
            <p className="similar__movies__heading">Similar</p>
            <div className="similar__movies__list">
                {similarMovies?.map(movie => <Link to="#" onClick={redirectToSimilarMovie.bind(null, movie?.id)} key={movie?.id}>
                    <MovieCard key={movie?.id} movie={movie} />
                </Link>)}
            </div>
        </div>
    )
}

export default SimilarMovies
