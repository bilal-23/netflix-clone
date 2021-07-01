import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import useWindowDimensions from '../hooks/use-windowDimensions';
import axios from '../axios/axios';
import Nav from './UI/Nav';
import Loading from './UI/Loading';
import SimilarMovies from './SimilarMovies';
import "./ShowDetails.scss"
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';

const ShowDetails = ({ mediaType }) => {
    const dimensions = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [castCrew, setCastCrew] = useState({});
    const [externalLinks, setExternalLinks] = useState({});
    const [similarMovies, setSimilarMovies] = useState({});
    const [castArray, setCastArray] = useState([]);
    const [similarMoviesArray, setSimilarMoviesArray] = useState([]);
    const [imageIsLoaded, setImageIsLoaded] = useState(false);


    const params = useParams();
    const movie_id = params[`${mediaType}`];
    const detailMovieUrl = `${mediaType}/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const castAndCrewUrl = `${mediaType}/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const externalIdUrl = `${mediaType}/${movie_id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const similarUrl = `${mediaType}/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const image_url = `https://image.tmdb.org/t/p/original/`;

    useEffect(() => {
        setIsLoading(true);
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
        return (() => setCastArray([]))
    }, [castCrew]);

    useEffect(() => {
        similarMovies?.results?.forEach((cast, index) => {
            if (index < 10) {
                setSimilarMoviesArray(prevState => {
                    return [...prevState, cast];
                })
            }
        })
        setIsLoading(false)

        return (() => setSimilarMoviesArray([]));
    }, [similarMovies]);

    const imageLoadHandler = () => {
        setImageIsLoaded(true);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Nav />
            {!imageIsLoaded && <Loading />}
            <div className="movie__details">
                <div className="detail__content">
                    <div className="detail__info" style={{ opacity: imageIsLoaded ? 1 : 0, transition: 'all 1s', visibility: imageIsLoaded && 'visible' }}>
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
                                        <div className="cast__member" key={cast?.id}>
                                            <img className="cast__image" src={`${image_url}${cast?.profile_path}`} alt={`${cast?.name}`} />
                                            <p className="cast__name">{cast?.name}</p>
                                        </div>
                                })}
                            </div>
                        </div>
                    </div>



                    <div className="detail__content__poster" style={{ display: imageIsLoaded ? 'block' : 'none' }}>
                        <div className="detail__content__poster__overlay"></div>
                        <img src={`${image_url}${dimensions.width > 900 ? movie?.poster_path : movie?.backdrop_path}`} alt={`${movie?.original_title}`} onLoad={imageLoadHandler} />
                    </div>
                </div>

                {similarMoviesArray.length > 0 && <SimilarMovies similarMovies={similarMoviesArray} mediaType={mediaType} imageIsLoaded={imageIsLoaded} />}
            </div>
        </>
    )
}
export default ShowDetails
