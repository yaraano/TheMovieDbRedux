import {applyMiddleware, createStore} from "redux";
import {moviesReducer} from "./reducers/MovieReducer.js";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
    movieReducer,
    composeWithDevTools(applyMiddleware(thunk))
);