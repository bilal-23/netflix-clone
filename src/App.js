import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import requests from './axios/Request';
import { moviesActions } from './store/moviesSlice';
import useFetchMovies from './hooks/use-fetchMovies';
import Homescreen from './components/Homescreen';
import NetflixIntro from './components/UI/NetflixIntro';
import Nav from './components/UI/Nav';
// import ShowDetails from './components/ShowDetails';
import './App.scss';
import Loading from './components/UI/Loading';


// const Homescreen = React.lazy(() => import("./components/Homescreen"));
const ShowDetails = React.lazy(() => import("./components/ShowDetails"));


function App() {

  const [showIntro, setShowIntro] = useState(false);
  const dispatch = useDispatch();
  const fetchMovie = useFetchMovies();
  useEffect(() => {
    const movie = async (fetchUrl) => {
      const data = await fetchMovie(fetchUrl);
      return data.results;
    }
    const fetchAllMovies = async () => {
      const netflixOriginals = await movie(requests.fetchNetflixOriginals);
      dispatch(moviesActions.updateNetflixOriginals(netflixOriginals));

      const trending = await movie(requests.fetchTrending);
      dispatch(moviesActions.updateTrending(trending));

      const topRated = await movie(requests.fetchTopRated);
      dispatch(moviesActions.updateTopRated(topRated));

      const action = await movie(requests.fetchActionMovies);
      dispatch(moviesActions.updateAction(action));

      const comedy = await movie(requests.fetchComedyMovies);
      dispatch(moviesActions.updateComedy(comedy));

      const horror = await movie(requests.fetchHorrorMovies);
      dispatch(moviesActions.updateHorror(horror));

      const romance = await movie(requests.fetchRomanceMovies);
      dispatch(moviesActions.updateRomance(romance));

      const documentaries = await movie(requests.fetchDocumentaries);
      dispatch(moviesActions.updateDocumentaries(documentaries));

      const allMovies = {
        netflixOriginals: [...netflixOriginals],
        trending: [...trending],
        topRated: [...topRated],
        action: [...action],
        comedy: [...comedy],
        horror: [...horror],
        romance: [...romance],
        documentaries: [...documentaries],
        expireTime: Date.now() + 3600000
      }
      localStorage.setItem("allMovies", JSON.stringify(allMovies));
    }
    if (!localStorage.getItem("allMovies")) {
      fetchAllMovies();
    } else if (JSON.parse(localStorage.getItem("allMovies")).expireTime < Date.now()) {
      localStorage.removeItem("allMovies");
    }

  }, [dispatch, fetchMovie])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500)

    return (() => clearTimeout(timer));
  })

  return (
    <div className="App">

      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/" exact>
            {showIntro && <NetflixIntro />}
            {!showIntro && <> <Nav /><Homescreen /></>}
          </Route>
          <Route path='/movie/:movie' >
            <ShowDetails mediaType="movie" />
          </Route>
          <Route path='/tv/:tv'>
            <ShowDetails mediaType="tv" />
          </Route>
        </Suspense>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
