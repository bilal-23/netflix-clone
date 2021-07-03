import axios from '../axios/axios';
import requests from '../axios/Request';

const fetchMovie = async (fetchUrl) => {
    const request = await axios.get(fetchUrl);
    return request.data;
}

const fetchAllMovies = async (setIsLoading) => {

    try {
        const netflixOriginals = await fetchMovie(requests.fetchNetflixOriginals);
        const trending = await fetchMovie(requests.fetchTrending);
        const topRated = await fetchMovie(requests.fetchTopRated);
        const action = await fetchMovie(requests.fetchActionMovies);
        const comedy = await fetchMovie(requests.fetchComedyMovies);
        const horror = await fetchMovie(requests.fetchHorrorMovies);
        const romance = await fetchMovie(requests.fetchRomanceMovies);
        const documentaries = await fetchMovie(requests.fetchDocumentaries);

        const movies = {
            netflixOriginals,
            trending,
            topRated,
            action,
            comedy,
            horror,
            romance,
            documentaries,
            expireTime: Date.now() + 3600000
        };
        console.log(movies);
        return movies;

    }
    catch (err) {
        throw new Error(`${err.response.status}`)
    }


}

export default fetchAllMovies;