const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
    fetchTrending: `/trending/all/day?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `movie/top_rated?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `movie/top_rated?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `movie/top_rated?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `movie/top_rated?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `discover/movie?api_key=${API_KEY}&with_genres=99`
}

export default requests;