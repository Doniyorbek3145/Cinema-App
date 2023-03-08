import React from 'react';
import Header from './component/header/header';
import "./App.scss";
import SimpleBottomNavigation from './component/mainNav';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Trending from "./pages/trending/trending";
import Movies from "./pages/movies/movies";
import Series from "./pages/series/series"
import Search from "./pages/search/search"
import ContentModal from './component/contentModal/contentModal';
function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="app">
                <Container>
                    <Switch>
                        <Route path='/' component={Trending} exact/>
                        <Route path='/movies' component={Movies} exact/>
                        <Route path='/series' component={Series} exact/>
                        <Route path='/search' component={Search} exact/>
                    </Switch>
                </Container>
            </div>


            <SimpleBottomNavigation />
        </BrowserRouter>
    )
}

export default App
