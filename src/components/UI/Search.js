import React, { useState, useRef } from 'react'
import "./Search.scss";

const Search = () => {
    const inputRef = useRef();
    const [showSearchBar, setShowSearchBar] = useState(false);

    const searchBarShowHandler = () => {
        setShowSearchBar(prevState => !prevState);
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const searchTerm = inputRef.current.value.trim();
        if (searchTerm.length === 0) {
            return;
        }
        else {
            console.log(searchTerm)
        }
    }

    return (
        <form action="" onSubmit={formSubmitHandler}>
            <div className="form__group">
                <input type="text" className="form__input" style={{ width: showSearchBar && '15rem', visibility: showSearchBar && 'visible', padding: showSearchBar && '0.5rem 3rem', opacity: showSearchBar && 1 }} placeholder="Search Term"
                    ref={inputRef} id="search" />

                <button type="button" className="form__button" onClick={searchBarShowHandler}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="Header__search-icon svg-inline--fa fa-search fa-w-16"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" ></path></svg>
                </button>
            </div>
        </form>

    )
}

export default Search
