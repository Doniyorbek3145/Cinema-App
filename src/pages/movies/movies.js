import { useEffect, useState } from "react";
import CustomPagination from "../../component/CustomPagination/CustomPagination";
import Genres from "../../component/genres/genres";
import SingleContent from "../../component/singleContent/singleContent";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../../redux/actions/entertainmentActions";


const Movies = () => {
  const [page, setPage] = useState(1);
  /*const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);*/
  // console.log(selectedGenres);

  const dispatch = useDispatch();
  const { movies, moviesNumberOfPages, movies_selected_genres } = useSelector(state => state.entertainment);

  /*const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);*/

  useEffect(() => {

    dispatch(getMovies(page, movies_selected_genres));

  }, [page, movies_selected_genres]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        setPage={setPage}
      />
      <div className="trending">
        {movies &&
          movies.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {moviesNumberOfPages > 1 && (
        <CustomPagination page={page} setPage={setPage} numOfPages={moviesNumberOfPages} />
      )}
    </div>
  );
};

export default Movies;
