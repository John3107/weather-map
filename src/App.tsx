import React, {useEffect} from 'react';
import './App.css';
import Main from "./components/main/Main";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {initialCitiesDataTC} from "./bll/app-reducer";
import {Route, Routes} from "react-router-dom";
import CityWeatherInfo from "./components/cityWeatherInfo/CityWeatherInfo";
import {CircularProgress} from "@material-ui/core";

function App() {
    const dispatch = useAppDispatch()
    const data = useAppSelector()

    useEffect(() => {
        dispatch(initialCitiesDataTC())
    }, [dispatch])

    if (data.initialized) {
        return <div style={{margin: "25% 50%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<Main/>}/>
                <Route path="/:city" element={<CityWeatherInfo/>}/>
            </Routes>
        </div>
    );
}

export default App;
