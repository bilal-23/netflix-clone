import React from 'react';
import Nav from './Nav';
import Banner from './Banner';
import './Homescreen.scss';

const Homescreen = () => {

    return (
        <div className="homescreen">
            <Nav />

            <Banner />

            {/* rows  */}
        </div>
    )
}

export default Homescreen;
