import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../actions/moviesActions";
import MoveList from "../../Components/MovieList/MovieList";
import Carousel from "../../Components/Carousel/Carousel";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

const HomePage = () => {
    const dispatch = useDispatch();
    const [pageParam, setPageParam] = useSearchParams('page');
    const page = pageParam.get('page') || 1;

    useEffect(() => {
        dispatch(getMovies(page));
    }, [dispatch, page]);

    const movies = useSelector((state) => state.movies.movies);

    const handleChangePage = (argPage) => {
        setPageParam({ page: argPage });
    };

    return (
        <>
            <Carousel movies={movies} />
            <div className={'container'}>
                <MoveList movies={movies} />
                <Pagination onClick={handleChangePage} />
            </div>
        </>
    );
};

export default HomePage;