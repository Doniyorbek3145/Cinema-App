import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Movie, Search, Tv, Whatshot } from '@material-ui/icons';


export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (value === 0) history.push("/")
        else if (value === 1) history.push("/movies")
        else if (value === 2) history.push("/series")
        else {history.push("/search")}
    }, [value, history])

    return (
        <Box sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            backgroundColor: "#2d313a",
            zIndex: 100
        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction style={{ color: "white" }} label="Trending" icon={<Whatshot />} />
                <BottomNavigationAction style={{ color: "white" }} label="Movies" icon={<Movie />} />
                <BottomNavigationAction style={{ color: "white" }} label="Series" icon={<Tv />} />
                <BottomNavigationAction style={{ color: "white" }} label="Search" icon={<Search />} />
            </BottomNavigation>
        </Box>
    );
}