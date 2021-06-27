import React, { useState } from 'react';
import { useEffect } from 'react';
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
                <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix logo" className="nav__logo" />
                <img src="./images/avatar.png" alt="Netflix user avatar" className="nav__avatar" />
            </div>
        </div>
    )
}

export default Nav;
