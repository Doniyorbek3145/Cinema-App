import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../component/CustomPagination/CustomPagination";
import Genres from "../../component/genres/genres";
import SingleContent from "../../component/singleContent/singleContent";
import useGenres from "../../hooks/useGenre";
import { getSeries } from "../../redux/actions/Actions";

const Series = () => {
  const [page, setPage] = useState(1);

  /*const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);*/
  /*const fetchSeries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${ApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    };*/

  const dispatch = useDispatch();

  const { series, seriesNumberOfPages, loading, series_selected_genres } = useSelector(state => state.entertainment);
  useEffect(() => {
    dispatch(getSeries(page, series_selected_genres));
  }, [page, series_selected_genres]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        setPage={setPage}
      />
      <div className="trending">
        {series &&
          series.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {seriesNumberOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={seriesNumberOfPages} />
      )}
    </div>
  );
};

export default Series;
