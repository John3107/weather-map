import React, {useEffect} from 'react';
import './App.css';
import Main from "./components/main/Main";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {initialCitiesDataTC, selectedCityTC} from "./bll/app-reducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import CityWeatherInfo from "./components/cityWeatherInfo/CityWeatherInfo";
import {CircularProgress} from "@material-ui/core";
import {CityWeatherType} from "./types/types";

function App() {
    const dispatch = useAppDispatch()
    const data = useAppSelector()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initialCitiesDataTC())
    }, [dispatch])

    if (data.initialized) {
        return <div style={{margin: "25% 50%"}}>
            <CircularProgress/>
        </div>
    }

    const toInfo = (data: CityWeatherType, name: string) => {
        dispatch(selectedCityTC(data))
        navigate(`/city/${name}`)
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<Main toInfo={toInfo}/>}/>
                <Route path="/city/:map" element={<CityWeatherInfo/>}/>
            </Routes>
        </div>
    );
}

export default App;
