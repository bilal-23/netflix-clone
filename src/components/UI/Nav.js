import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm.js'
import logo from '../../assets/images/logo.png';
import avatar from '../../assets/images/avatar.png';
import './Nav.scss';


const Nav = () => {
    const [show, setShow] = useState(false);
    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar)
        return () => window.removeEventListener('scroll', transitionNavbar);
    }, [])


    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <Link className="navLink" to="/">   <img src={logo} alt="Netflix logo" className="nav__logo" /></Link>

                <div className="nav__right">
                    <SearchForm />
                    <img src={avatar} alt="Netflix user avatar" className="nav__avatar" />
                </div>
            </div>
        </div>
    )
}

export default Nav;
