"use client";
import React, { useEffect, useState, Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import fetchAllMovies from "./helpers/fetchAllMovies.js";
import Homescreen from "./components/Homescreen";
import Netflixintro from "./components/UI/NetflixIntro";
import Nav from "./components/UI/Nav";
import Loading from "./components/UI/Loading";
import Modal from "./components/UI/Modal";

const ShowDetails = React.lazy(() => import("./components/ShowDetails"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [movies, setMovies] = useState();
  const [error, setError] = useState(false);

  const getAllMovies = async () => {
    try {
      const fetchedMovies = await fetchAllMovies();
      setMovies(fetchedMovies);
      setIsLoading(false);
      localStorage.setItem("allMovies", JSON.stringify(fetchedMovies));
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    const movieInLocalStorage = JSON.parse(localStorage.getItem("allMovies"));
    if (movieInLocalStorage && movieInLocalStorage.expireTime < Date.now()) {
      localStorage.removeItem("allMovies");
      getAllMovies();
    } else if (movieInLocalStorage) {
      setMovies(movieInLocalStorage);
      setIsLoading(false);
    } else {
      getAllMovies();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    return () => clearTimeout(timer);
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Modal>
        <div className="error__modal">
          <p className="error__heaading">
            {" "}
            <span style={{ color: "#e50914" }}>Error: {error.message} </span>
            Something went wrong !
          </p>
          <p className="error__text"> Please try again.</p>
        </div>{" "}
      </Modal>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              {showIntro ? (
                <Netflixintro />
              ) : movies ? (
                <>
                  <Nav />
                  <Homescreen movies={movies} />
                </>
              ) : null}
            </Suspense>
          }
        />
        <Route
          path="/movie/:movie"
          element={<ShowDetails mediaType="movie" />}
        />
        <Route path="/tv/:tv" element={<ShowDetails mediaType="tv" />} />
        <Route path="/search/:query" element={<SearchResults />} />
        {/* Catch-all route for redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
