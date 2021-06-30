import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from '../axios/axios';
import useWindowDimensions from '../hooks/use-windowDimensions';
import Nav from './UI/Nav';
import './MovieDetails.scss';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';

const MovieDetails = () => {
    const dimensions = useWindowDimensions();
    const [movie, setMovie] = useState({});
    const [castCrew, setCastCrew] = useState({});
    const [externalLinks, setExternalLinks] = useState({});
    const [similarMovies, setSimilarMovies] = useState({});
    const [castArray, setCastArray] = useState([]);

    const params = useParams();
    const movie_id = params.tvId;
    const detailMovieUrl = `tv/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const castAndCrewUrl = `tv/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const externalIdUrl = `tv/${movie_id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const similarUrl = `tv/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const image_url = `https://image.tmdb.org/t/p/original/`;

    useEffect(() => {
        axios.get(detailMovieUrl).then((req) => setMovie(req.data))
        axios.get(castAndCrewUrl).then((req) => setCastCrew(req.data));
        axios.get(externalIdUrl).then((req) => setExternalLinks(req.data));
        axios.get(similarUrl).then((req) => setSimilarMovies(req.data));
    }, [detailMovieUrl, castAndCrewUrl, externalIdUrl, similarUrl]);

    useEffect(() => {
        castCrew?.cast?.forEach((cast, index) => {
            if (index < 5) {
                setCastArray(prevState => {
                    return [...prevState, cast];
                })
            }
        })
    }, [castCrew]);

    return (
        <>
            <Nav />
            <div className="movie__details">
                <div className="detail__content">
                    <div className="detail__info">
                        <h1 className="detail__title">{movie?.title || movie?.original_title || movie?.name}</h1>
                        <div className="detail__additional__info">
                            <p className="detail__rating">{movie?.vote_average * 10}% Match</p>
                            <p className="detail__year">{movie?.release_date?.substr(0, 4) || movie?.first_air_date?.substr(0, 4)}</p>
                            <p className="detail__genre">{movie?.genres?.map((genre, index) => <span key={index}>{genre.name}</span>)}</p>
                            {movie?.runtime && <p className="detail__duration">{movie?.runtime} minutes</p>}
                        </div>
                        <div className="detail__overview">
                            <p>{movie?.overview}</p>
                        </div>
                        <div className="detail__externalLinks">
                            {externalLinks?.instagram_id && <a href={`https://www.instagram.com/${externalLinks?.instagram_id}`} className="detail__externalLink"><img className="detail__externalLink__icon" src={instagram} alt="Instagram icon" /></a>}
                            {externalLinks?.facebook_id && <a href={`https://www.facebook.com/${externalLinks?.facebook_id}`} className="detail__externalLink"><img className="detail__externalLink__icon" src={facebook} alt="facebook icon" /></a>}
                            {externalLinks?.twitter_id && <a href={`https://www.twitter.com/${externalLinks?.twitter_id}`} className="detail__externalLink"><img className="detail__externalLink__icon" src={twitter} alt="twitter icon" /></a>}
                        </div>

                        <div className="detail__cast">
                            <p className="detail__cast__title">Cast</p>
                            <div className="detail__cast__members">
                                {castArray?.map(cast => {
                                    return cast?.profile_path &&
                                        <div className="cast__member">
                                            <img className="cast__image" src={`${image_url}${cast?.profile_path}`} />
                                            <p className="cast__name">{cast?.name}</p>
                                        </div>
                                })}
                            </div>
                        </div>
                    </div>



                    <div className="detail__content__poster">
                        <div className="detail__content__poster__overlay"></div>
                        <img src={`${image_url}${dimensions.width > 900 ? movie?.poster_path : movie?.backdrop_path}`} alt="" />
                    </div>
                </div>
                <div className="similar__movies"></div>
            </div>
        </>
    )
}
export default MovieDetails
