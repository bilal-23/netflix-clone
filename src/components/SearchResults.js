import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from '../axios/axios';
import MovieCards from './MovieCard';
import Nav from './UI/Nav';
import Loading from './UI/Loading';
import "./SearchResults.scss"

const SearchResults = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const query = params.query;
    const searchUrl = `search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    useEffect(() => {
        axios.get(searchUrl).then((req) => setSearchResults(req.data.results));
        setIsLoading(false);
    }, [searchUrl])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Nav />
            <div className="search">
                <h2 className="search__term">Search results for <span> {query}</span></h2>
                <div className="search__cards">
                    {searchResults && searchResults.map(result => result?.poster_path && <MovieCards movie={result} key={result?.id} />)}
                </div>
            </div>
        </>
    )
}

export default SearchResults
