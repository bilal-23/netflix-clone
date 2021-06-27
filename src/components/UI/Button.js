import React from 'react';
import './Button.scss';

const Button = (props) => {
    const classes = `btn ${props.className}`;
    return (
        <button className={classes} >{props.children}</button>
    )
}

export default Button;
