import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import fetchAllMovies from "./helpers/fetchAllMovies.js";
import Homescreen from './components/Homescreen';
import NetflixIntro from './components/UI/NetflixIntro';
import Nav from './components/UI/Nav';
import Loading from './components/UI/Loading';
import Modal from './components/UI/Modal';
import './App.scss';

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
      localStorage.setItem('allMovies', JSON.stringify(fetchedMovies));
    }
    catch (err) {
      setIsLoading(false);
      setError(err);
    }
  }


  useEffect(() => {
    const movieInLocalStorage = JSON.parse(localStorage.getItem('allMovies'));
    if (movieInLocalStorage && movieInLocalStorage.expireTime < Date.now()) {
      localStorage.removeItem("allMovies");
      getAllMovies();

    } else if (movieInLocalStorage) {
      setMovies(movieInLocalStorage);
      setIsLoading(false);

    } else {
      getAllMovies();
    }
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500)

    return (() => clearTimeout(timer));
  })


  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <Modal><div className="error__modal">
        <p className="error__heaading"> <span style={{ color: "#e50914" }}>Error: {error.message} </span>Something went wrong !</p>
        <p className="error__text"> Please try again.</p>
      </div> </Modal>
    )
  }

  return (
    <div className="App">

      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/" exact>
            {showIntro && <NetflixIntro />}
            {!showIntro && movies && <> <Nav /><Homescreen movies={movies} /></>}
          </Route>
          <Route path='/movie/:movie' >
            <ShowDetails mediaType="movie" />
          </Route>
          <Route path='/tv/:tv'>
            <ShowDetails mediaType="tv" />
          </Route>
          <Route path="/search/:query">
            <SearchResults />
          </Route>

        </Suspense>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div >
  );
}

export default App;
