import React from 'react';
import Nav from './UI/Nav';
import Banner from './Banner';
import Row from './Row';
import requests from '../axios/Request';
import './Homescreen.scss';

const Homescreen = () => {

    return (
        <div className="homescreen">
            <Nav />
            <Banner fetchUrl={requests.fetchNetflixOriginals} />
            <div className="rows">
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
                <Row title="trending now" fetchUrl={requests.fetchTrending} />
                {/* <Row title="top rated" fetchUrl={requests.fetchTopRated} />
                <Row title="action movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="comedy movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="horror movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="romance movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="documentaries" fetchUrl={requests.fetchDocumentaries} /> */}
            </div>
        </div>
    )
}

export default Homescreen;
