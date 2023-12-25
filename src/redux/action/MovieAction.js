import axios from "axios";
import {GET_MOVIE_BY_ID, GET_MOVIE_RECOMMENDATIONS, GET_MOVIE_TRAILERS, GET_MOVIES} from "../types/types";
import {API_KEY, BASE_URL} from "../../Components/Config/Config";

export const getMovies = (page) => {
    return (dispatch) => {
        axios(`${BASE_URL}discover/movie?page=1&api_key=${API_KEY}&language=ru-RU&page=${page}`)
            .then(({data}) => {
                dispatch({type: GET_MOVIES, payload: data})
            })
    }
}
export const getMovieById = (id) => {
    return (dispatch) => {
        axios(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=ru-RU`)
            .then(({ data }) => {
                dispatch({ type: GET_MOVIE_BY_ID, payload: data });
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    };
};

export const getMovieRecommendations = (id) => {
    return (dispatch) => {
        axios(`${BASE_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=ru-RU&page=1`)
            .then(({ data }) => {
                dispatch({ type: GET_MOVIE_RECOMMENDATIONS, payload: data.results });
            })
            .catch((error) => {
                console.error("Error fetching movie recommendations:", error);
            });
    };
};

export const getMovieTrailers = (id) => {
    return (dispatch) => {
        axios(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`)
            .then(({ data }) => {
                dispatch({ type: GET_MOVIE_TRAILERS, payload: data.results.slice(0, 1) });
            })
            .catch((error) => {
                console.error("Error fetching movie trailers:", error);
            });
    };
};