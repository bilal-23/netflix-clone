import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import useMovies from './hooks/use-Movies';
import Homescreen from './components/Homescreen';
import NetflixIntro from './components/UI/NetflixIntro';
import Nav from './components/UI/Nav';
import Loading from './components/UI/Loading';
import './App.scss';

const ShowDetails = React.lazy(() => import("./components/ShowDetails"));
const SearchResults = React.lazy(() => import("./components/SearchResults"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const fetchAllMovies = useMovies();

  useEffect(() => {
    setIsLoading(true);
    fetchAllMovies(setIsLoading);
  }, [fetchAllMovies])


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500)

    return (() => clearTimeout(timer));
  })

  if (isLoading) {
    return <Loading />
  }

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
          <Route path="/search/:query">
            <SearchResults />
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
