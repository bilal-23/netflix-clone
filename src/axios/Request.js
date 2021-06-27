const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
    fetchTrending: `/trending/all/day?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `movie/top_rated?api_key=${API_KEY}&language=en-US&page=${Math.floor(Math.random() * (100 - 1) + 1)}`,
    fetchActionMovies: `movie/top_rated?api_key=${API_KEY}&width_genres=28&page=${Math.floor(Math.random() * (100 - 1) + 1)}`,
    fetchComedyMovies: `movie/top_rated?api_key=${API_KEY}&width_genres=35&page=${Math.floor(Math.random() * (100 - 1) + 1)}`,
    fetchHorrorMovies: `movie/top_rated?api_key=${API_KEY}&width_genres=27&page=${Math.floor(Math.random() * (100 - 1) + 1)}`,
    fetchRomanceMovies: `movie/top_rated?api_key=${API_KEY}&width_genres=10749&page=${Math.floor(Math.random() * (100 - 1) + 1)}`,
    fetchDocumentaries: `movie/top_rated?api_key=${API_KEY}&width_genres=99&page=${Math.floor(Math.random() * (100 - 1) + 1)}`
}

export default requests;