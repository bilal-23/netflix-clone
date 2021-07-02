import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import useWindowDimensions from '../hooks/use-windowDimensions';
import axios from '../axios/axios';
import Nav from './UI/Nav';
import Loading from './UI/Loading';
import SimilarMovies from './SimilarMovies';
import "./ShowDetails.scss";

const ShowDetails = ({ mediaType }) => {
    const dimensions = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movie, setMovie] = useState({});
    const [castCrew, setCastCrew] = useState({});
    const [externalLinks, setExternalLinks] = useState({});
    const [similarMovies, setSimilarMovies] = useState({});
    const [castArray, setCastArray] = useState([]);
    const [similarMoviesArray, setSimilarMoviesArray] = useState([]);
    const [imageIsLoaded, setImageIsLoaded] = useState(false);
    const [castImageLoaded, setCastImageLoaded] = useState(false);


    const params = useParams();
    const movie_id = params[`${mediaType}`];
    const detailMovieUrl = `${mediaType}/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const castAndCrewUrl = `${mediaType}/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const externalIdUrl = `${mediaType}/${movie_id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const similarUrl = `${mediaType}/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const image_url = `https://image.tmdb.org/t/p/original/`;

    useEffect(() => {
        setIsLoading(true);
        axios.get(detailMovieUrl).then((req) => setMovie(req.data)).catch(err => setError(err))
        axios.get(castAndCrewUrl).then((req) => setCastCrew(req.data)).catch(err => setError(err));
        axios.get(externalIdUrl).then((req) => setExternalLinks(req.data)).catch(err => setError(err));
        axios.get(similarUrl).then((req) => setSimilarMovies(req.data)).catch(err => setError(err));

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
        setIsLoading(false);

        return (() => setSimilarMoviesArray([]));
    }, [similarMovies]);

    const imageLoadHandler = () => {
        setImageIsLoaded(true);
    }

    const castImageLoadHandler = () => {
        setCastImageLoaded(true);
    }


    if (isLoading) {
        return <Loading />
    }
    if (error) {
        return (
            <>
                <Nav />
                <div className="error__container">
                    <h1><span>Something</span> went wrong!</h1>
                    <h2>Please try again later.</h2>
                </div>
            </>
        )
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
                            {externalLinks?.instagram_id &&
                                <a href={`https://www.instagram.com/${externalLinks?.instagram_id}`} className="detail__externalLink">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>}
                            {externalLinks?.facebook_id && <a href={`https://www.facebook.com/${externalLinks?.facebook_id}`} className="detail__externalLink">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>}
                            {externalLinks?.twitter_id && <a href={`https://www.twitter.com/${externalLinks?.twitter_id}`} className="detail__externalLink">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>

                            </a>}
                        </div>

                        <div className="detail__cast" style={{ opacity: castImageLoaded ? '1' : '0' }}>
                            <p className="detail__cast__title">Cast</p>
                            <div className="detail__cast__members">
                                {castArray?.map(cast => {
                                    return cast?.profile_path &&
                                        <div className="cast__member" key={cast?.id}>
                                            <img className="cast__image" src={`${image_url}${cast?.profile_path}`} alt={`${cast?.name}`} onLoad={castImageLoadHandler} />
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
