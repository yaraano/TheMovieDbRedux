import {GET_MOVIE_BY_ID, GET_MOVIE_RECOMMENDATIONS, GET_MOVIE_TRAILERS, GET_MOVIES} from "../types/types";

const initialState = {
    movie: {},
    similarMovies: [],
    trailers: [],
};

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES:
            return { ...state, movies: action.payload };
        case GET_MOVIE_BY_ID:
            return { ...state, movie: action.payload };
        case GET_MOVIE_RECOMMENDATIONS:
            return { ...state, similarMovies: action.payload };
        case GET_MOVIE_TRAILERS:
            return { ...state, trailers: action.payload };
        default:
            return state;
    }
};