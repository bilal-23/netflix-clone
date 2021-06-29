import React from 'react'
import './MovieCard.scss';

const MovieCard = ({ movie }) => {

    const image_url = `https://image.tmdb.org/t/p/original/`;
    console.log(movie);
    return (
        <div className="movie__card">
            <div className="movie__card__overlay"></div>
            <img className={`movie__poster`} src={`${image_url}${movie?.poster_path}`} alt={movie?.title} />
            <div className="movie__card__info">
                <h3 className="movie__card__name">{movie?.name || movie?.title || movie?.original_title}</h3>
                <div className="movie__card__additionalInfo">
                    <span className="movie__card__rating">{movie?.vote_average * 10}% Match</span> <span className="movie__card__year">{movie?.first_air_date?.substr(0, 4)}</span>
                </div>
            </div>
        </div>

    )
}

export default MovieCard
