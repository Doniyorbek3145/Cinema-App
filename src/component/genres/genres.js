import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMoviesSelectedGenresData, setSeriesSelectedGenresData } from "../../redux/actions/entertainmentActions";
import useGenres from "../../hooks/useGenre";


const Genres = ({ setPage, type }) => {

    const dispatch = useDispatch();

    const { movies_genres_data } = useSelector(state => state.entertainment);

    const [selectedGenres, setSelectedGenres] = useState([]);

    const [genres, setGenres] = useState(movies_genres_data);

    const genreForUrl = useGenres(selectedGenres);


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    /*const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${ApiKey}&language=en-US`
        );
        setGenres(data.genres);
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);*/

    useEffect(() => {
        if (type === "movie") {
            dispatch(setMoviesSelectedGenresData(genreForUrl));
        }
        else {
            dispatch(setSeriesSelectedGenresData(genreForUrl));
        }
    }, [genreForUrl]);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    );
};

export default Genres;

