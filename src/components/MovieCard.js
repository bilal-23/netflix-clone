import React, { useState } from 'react'
import ImageLoader from './UI/ImageLoader';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    const image_url = `https://image.tmdb.org/t/p/original/`;

    const imageLoadHandler = () => {
        setImageIsLoaded(true);
    }

    if (!movie?.poster_path) {
        return <div></div>;
    }

    return (
        <>
            <div className="movie__card__wrapper">

                {!imageIsLoaded && <div className="image__placeholder">{<ImageLoader />}</div>}


                <div className="movie__card" style={{ opacity: imageIsLoaded ? '1' : '0', transform: imageIsLoaded && 'scale(1)' }}>
                    <div className="movie__card__overlay"></div>
                    <img className={`movie__poster`} src={`${image_url}${movie?.poster_path}`} alt={movie?.title} loading="lazy" onLoad={imageLoadHandler} />
                    <div className="movie__card__info">
                        <h3 className="movie__card__name">{movie?.name || movie?.title || movie?.original_title}</h3>
                        <div className="movie__card__additionalInfo">
                            <span className="movie__card__rating">{movie?.vote_average * 10}% Match</span> <span className="movie__card__year">{movie.first_air_date ? (movie?.first_air_date?.substr(0, 4) || movie?.release_date.substr(0, 4)) : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard
