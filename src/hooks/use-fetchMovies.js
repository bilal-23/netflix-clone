import axios from "../axios/axios";


const useFetchMovies = () => {

    const fetchMovie = async (fetchUrl) => {
        const request = await axios.get(fetchUrl);

        return request.data;

    }

    return fetchMovie;
}
export default useFetchMovies;