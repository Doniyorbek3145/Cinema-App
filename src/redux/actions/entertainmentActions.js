import {
    GET_MOVIES, GET_MOVIES_GENRES_DATA, GET_SEARCH_CINEMA_DATA, GET_SERIES, GET_SERIES_GENRES_DATA,
    GET_SINGLE_CINEMA, GET_SINGLE_CINEMA_CREDITS,
    GET_SINGLE_CINEMA_VIDEO,
    GET_TRENDING,
    LOADING_FALSE,
    LOADING_TRUE, SET_MOVIES_SELECTED_GENRES, SET_SEARCH_TEXT, SET_SERIES_SELECTED_GENRES
} from "../actionTypes/actionTypes";
import { ApiKey as APIKey}  from "../../pages/trending/trending";
import axios from "axios";
export const PATH_NAME = "https://api.themoviedb.org/3";


export const getTrending = (page) => async (dispatch) => {

    

    try {

        const res = await axios.get(`${PATH_NAME}/trending/all/week?api_key=${APIKey}&page=${page}`);

        dispatch({
            type: GET_TRENDING,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getSingleCinema = (cinema_type, cinema_id) => async (dispatch) => {

    

    try {

        const res = await axios.get(`${PATH_NAME}/${cinema_type}/${cinema_id}?api_key=${APIKey}&language=en-US`);


        dispatch({
            type: GET_SINGLE_CINEMA,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getSingleCinemaVideo = (cinema_type, cinema_id) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/${cinema_type}/${cinema_id}/videos?api_key=${APIKey}&language=en-US`);

        dispatch({
            type: GET_SINGLE_CINEMA_VIDEO,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getSingleCinemaCredits = (cinema_type, cinema_id) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/${cinema_type}/${cinema_id}/credits?api_key=${APIKey}&language=en-US`);

        dispatch({
            type: GET_SINGLE_CINEMA_CREDITS,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getMovies = (page, genresForUrl) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresForUrl}`);

        dispatch({
            type: GET_MOVIES,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getMoviesGenresData = (cinema_type) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/genre/${cinema_type}/list?api_key=${APIKey}&language=en-us`);

        dispatch({
            type: GET_MOVIES_GENRES_DATA,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const setMoviesSelectedGenresData = (selected_genres) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        dispatch({
            type: SET_MOVIES_SELECTED_GENRES,
            payload: selected_genres
        });


    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getSeries = (page, genreForUrl) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/discover/tv?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`);

        dispatch({
            type: GET_SERIES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getSeriesGenresData = (cinema_type) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/genre/${cinema_type}/list?api_key=${APIKey}&language=en-us`);

        dispatch({
            type: GET_SERIES_GENRES_DATA,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const setSeriesSelectedGenresData = (selected_genres) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        dispatch({
            type: SET_SERIES_SELECTED_GENRES,
            payload: selected_genres
        });

    } catch (err) {
        dispatch({
            type: LOADING_FALSE
        })
    }
};

export const getSearchCinemaData = (type, searchText, page) => async (dispatch) => {

    dispatch({
        type: LOADING_TRUE
    });

    try {

        const res = await axios.get(`${PATH_NAME}/search/${type ? "tv" : "movie"}?api_key=${APIKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);


        dispatch({
            type: GET_SEARCH_CINEMA_DATA,
            payload: res.data
        });


        dispatch({
            type: SET_SEARCH_TEXT,
            payload: {
                searchText,
                currentPage: page,
                currentType: type
            }
        });


    } catch (err) {

        dispatch({
            type: LOADING_FALSE
        })
    }
};
