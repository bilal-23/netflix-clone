import React from 'react';
import { Link } from 'react-router-dom';
import play from '../assets/play.svg'
import Button from './UI/Button';
import './Banner.scss';

const Banner = ({ bannerMovie }) => {
    const movie = bannerMovie;

    const truncateString = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <header className="banner" style={
            { backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` }
        }>

            <div className="banner__wrapper">
                {movie?.vote_average && <div className="banner__content">
                    <h1 className="banner__name">{movie?.name || movie?.original_name}</h1>
                    <div className="banner__info"><span className="banner__rating">{movie?.vote_average * 10}% Match</span> <span className="banner__year">{movie?.first_air_date?.substr(0, 4)}</span></div>
                    <div className="banner__overview">{truncateString(movie?.overview, 200)}</div>
                    <div className="banner__buttons">
                        <Link className="btn-link" to={`${movie?.media_type || 'tv'}/${movie?.id}`}>
                            <Button className="button--primary">
                                <img src={play} alt="play now" />
                                Play
                            </Button>
                        </Link>
                        <Button className="button--secondary">
                            +
                            My List</Button>
                    </div>
                </div>}
            </div>
        </header>
    )
}

export default Banner;
