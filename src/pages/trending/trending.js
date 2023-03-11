import React, { useEffect, useState } from "react";
import SingleContent from "../../component/singleContent/singleContent";
import "./Trending.scss";
import CustomPagination from "../../component/CustomPagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../redux/actions/entertainmentActions";

export const ApiKey = `1fd40a54bb7c8b5e91b107f78cdaac79`;

const Trending = () => {
    /*const [page, setPage] = useState(1)
    const [content, setContent] = useState([]);
    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${ApiKey}&page=${page}`
        );
        setContent(data.results);
    };

    useEffect(() => {
        fetchTrending();
    }, [page]);
*/

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    const { trending, trendingNumberOfPages } = useSelector(state => state.entertainment);

    useEffect(() => {
        dispatch(getTrending(page));
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {
                    trending && trending.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_avarage={c.vote_avarage} />
                    ))
                }
            </div>
            <CustomPagination setPage={setPage} page={page} numOfPages={trendingNumberOfPages}/>
        </div>
    )
}

export default Trending;