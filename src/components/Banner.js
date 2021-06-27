import React from 'react';
import Button from './UI/Button';
import './Banner.scss';

const Banner = () => {

    const truncateString = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <header className="banner" style={{ backgroundColor: 'black' }}>

            <div className="banner__contents">
                <h1 className="banner__title">Movie Name</h1>
                <div className="banner__buttons">
                    <Button className="banner__button">Play</Button>
                    <Button className="banner__button">My List</Button>
                </div>
                <h2 className="banner__description">
                    {truncateString(`This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription This is a test decription`, 150)}
                </h2>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;
