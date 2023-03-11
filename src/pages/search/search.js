import {
    Button,
    createTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import "./search.css";
import SingleContent from "../../component/singleContent/singleContent";
import CustomPagination from "../../component/CustomPagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { getSearchCinemaData } from "../../redux/actions/entertainmentActions";

const Search = () => {
    const [isResult, setIsResult] = useState(false);

    const dispatch = useDispatch();

    const { search_cinema_data, searchCinemaNumberOfPage, search_text, current_type, current_page } = useSelector(state => state.entertainment);

    const [type, setType] = useState(current_type);
    const [searchText, setSearchText] = useState(search_text);
    const [page, setPage] = useState(current_page);

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    /*const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${ApiKey
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };*/

    const getSearchData = () => {
        if (searchText !== "") {
            dispatch(getSearchCinemaData(type, searchText, page));
            setIsResult(true);
        } else {
            alert("Fill in the search field !!!")
        }
    };

    useEffect(() => {
        if (searchText !== "") {
            dispatch(getSearchCinemaData(type, searchText, page));
            setIsResult(true);
        }
    }, [type, page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className="search">
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        style={{ marginLeft: 10 }}
                        onClick={()=>getSearchData()}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: 5 }}
                    aria-label="disabled tabs example"
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {search_cinema_data &&
                    search_cinema_data.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
                {searchText &&
                    !search_cinema_data &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {searchCinemaNumberOfPage > 1 && (
                <CustomPagination page={page} setPage={setPage} numOfPages={searchCinemaNumberOfPage} />
            )}
        </div>
    );
};

export default Search;
