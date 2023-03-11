import {
    GET_MOVIES, GET_MOVIES_GENRES_DATA, GET_SEARCH_CINEMA_DATA, GET_SERIES, GET_SERIES_GENRES_DATA,
    GET_SINGLE_CINEMA, GET_SINGLE_CINEMA_CREDITS,
    GET_SINGLE_CINEMA_VIDEO,
    GET_TRENDING,
    LOADING_FALSE,
    LOADING_TRUE, SET_MOVIES_SELECTED_GENRES, SET_SEARCH_TEXT, SET_SERIES_SELECTED_GENRES
} from "../actionTypes/actionTypes";

const initialState = {
    trending: [],
    trendingNumberOfPages: 1,

    singleCinema: [],
    singleCinemaVideo: '',
    singleCinemaCredits: [],

    movies: [],
    moviesNumberOfPages: 1,
    movies_genres_data: [],
    movies_selected_genres: '',

    series: [],
    seriesNumberOfPages: 1,
    series_genres_data: [],
    series_selected_genres: '',


    search_cinema_data: [],
    search_text: '',
    current_page: 1,
    current_type: 0,
    searchCinemaNumberOfPage: 1,


    loading: false,
};


export const entertainmentReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch (type) {

        case LOADING_TRUE:
            return {
                ...state,
                loading: true,
            };

        case LOADING_FALSE:

            return {
                ...state,
                loading: false,
            };

        case GET_TRENDING:

            return {
                ...state,
                trending: payload.results,
                trendingNumberOfPages: payload.total_pages,
                loading: false,
            };

        case GET_SINGLE_CINEMA:

            return {
                ...state,
                singleCinema: payload,
                loading: false,
            };

        case GET_SINGLE_CINEMA_VIDEO:

            return {
                ...state,
                singleCinemaVideo: payload.results[0].key,
                loading: false,
            };

        case GET_SINGLE_CINEMA_CREDITS:

            return {
                ...state,
                singleCinemaCredits: payload.cast,
                loading: false,
            };

        case GET_MOVIES:

            return {
                ...state,
                movies: payload.results,
                moviesNumberOfPages: payload.total_pages <= 500 ? payload.total_pages : 500,
                loading: false,
            };

        case GET_SERIES:

            return {
                ...state,
                series: payload.results,
                seriesNumberOfPages: payload.total_pages <= 500 ? payload.total_pages : 500,
                loading: false,
            };

        case GET_MOVIES_GENRES_DATA:

            return {
                ...state,
                movies_genres_data: payload.genres,
                loading: false,
            };


        case GET_SERIES_GENRES_DATA:

            return {
                ...state,
                series_genres_data: payload.genres,
                loading: false,
            };

        case SET_MOVIES_SELECTED_GENRES:

            return {
                ...state,
                movies_selected_genres: payload,
                loading: false,
            };

        case SET_SERIES_SELECTED_GENRES:

            return {
                ...state,
                series_selected_genres: payload,
                loading: false,
            };

        case GET_SEARCH_CINEMA_DATA:

            return {
                ...state,
                search_cinema_data: payload.results,
                searchCinemaNumberOfPage: payload.total_pages,
                loading: false,
            };

        case SET_SEARCH_TEXT:
            return {
                ...state,
                search_text: payload.searchText,
                current_page: payload.currentPage,
                current_type: payload.currentType
            };


        default:
            return state;
    }
};


