import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieList from "../../Components/MovieList/MovieList";
import { getMovieById, getMovieRecommendations, getMovieTrailers } from "../actions/movieActions";
import { PAGE_URL } from "../../Components/Config/Config";
import img from "./Assets/img.jpg";

const MoviePages = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieById(id));
        dispatch(getMovieRecommendations(id));
        dispatch(getMovieTrailers(id));
    }, [dispatch, id]);

    const movie = useSelector((state) => state.movies.movie);
    const similarMovies = useSelector((state) => state.movies.similarMovies);
    const trailers = useSelector((state) => state.movies.trailers);

    const visibleActors = movie.cast?.slice(0, 12) || [];

    return (
        <div className={"container"}>
            {movie ? (
                <div className={"movie-details"}>
                    <div className="poster">
                        <img
                            src={movie.poster_path ? `${PAGE_URL}${movie.poster_path}` : `${img}`}
                            alt=""
                        />
                        <div className={"trailer-container"}>
                            <h2>Трейлеры</h2>
                            {trailers.length > 0 ? (
                                trailers.map((trailer) => (
                                    <iframe
                                        key={trailer.id}
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ height: "260px" }}
                                    ></iframe>
                                ))
                            ) : (
                                <p>No trailers available.</p>
                            )}
                        </div>
                    </div>
                    <div className="details">
                        <div className="info-section">
                            <h1 className="title">{movie.title}</h1>
                            <p className="original-title">{movie.original_title}</p>
                            <p className="release-date">{movie.release_date}</p>
                            <p className="overview">{movie.overview}</p>
                        </div>
                        <div className="rating-section">
                            <p className="rating">{movie.vote_average}</p>
                            <p className="popularity">{movie.popularity} оценки</p>
                            <h3 className="actors">В главных ролях:</h3>
                            <div className="actors-container">
                                <div className="row">
                                    {visibleActors.map((actor) => (
                                        <div className={'col-3'} key={actor.id}>
                                            <div className="actorBox">
                                                <img
                                                    className={'actorImg'}
                                                    src={actor.profile_path ? `${PAGE_URL}${actor.profile_path}` : `${img}`}
                                                    alt=""
                                                />
                                                <h5>{actor.name}</h5>
                                                <p>{actor.character}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div>
                {similarMovies.length > 0 && (
                    <section className="similar-movies">
                        <h2>Рекомендации</h2>
                        <MovieList movies={similarMovies} />
                    </section>
                )}
            </div>
        </div>
    );
};

export default MoviePages;
