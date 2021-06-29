import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './UI/Nav';
import Banner from './Banner';
import Row from './Row';
import './Homescreen.scss';

const Homescreen = () => {
    const movies = useSelector(state => state.movies);
    return (
        <div className="homescreen">
            <Nav />
            <Banner movies={movies.netflixOriginals} />
            <div className="rows">
                <Row title="Netflix Originals" movies={movies.netflixOriginals} />
                <Row title="trending now" movies={movies.trending} />
                <Row title="top rated" movies={movies.topRated} />
                {/* <Row title="action movies" movies={movies.action} />
                <Row title="comedy movies" movies={movies.comedy} />
                <Row title="horror movies" movies={movies.horror} />
                <Row title="romance movies" movies={movies.romance} />
                <Row title="documentaries" movies={movies.documentaries} /> */}
            </div>
        </div>
    )
}

export default Homescreen;
