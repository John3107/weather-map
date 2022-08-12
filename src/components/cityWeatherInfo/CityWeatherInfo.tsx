import React, {useEffect} from 'react';
import './CityWeatherInfo.css';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Paper} from "@material-ui/core";
import {selectedCityInitTC} from "../../bll/app-reducer";
import {ArrowUpward} from '@material-ui/icons';

const CityWeatherInfo = () => {
    const data = useAppSelector()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(selectedCityInitTC())
    }, [dispatch])

    return (
        <div className="cityInfo">
            <div className="date">{data.selectedCity.date.split('GMT')[0]}</div>
            <Paper className="paperMain">
                <div className="head">
                    <span className="currentWeather">current weather</span>
                    <div className="main">
                        <img src={`http://openweathermap.org/img/wn/${data.selectedCity.icon}@2x.png`} alt=""/>
                        <span style={{fontSize: '30px'}}>{data.selectedCity.temp}C°</span>
                    </div>
                    <span>{data.selectedCity.description}</span>
                    <div>{data.selectedCity.name}, {data.selectedCity.country}</div>
                </div>
                <div className="body">
                    <div className="side">
                        <div className="param">
                            <span>Wind</span>
                            <span>{data.selectedCity.windSpeed} m/s</span>
                        </div>
                        <div className="param">
                            <span>Wind degree</span>
                            <ArrowUpward style={{transform: `rotate(${data.selectedCity.windDeg}deg)`}}/>
                        </div>
                        <div className="param">
                            <span>Humidity</span>
                            <span>{data.selectedCity.humidity}%</span>
                        </div>
                    </div>
                    <div className="side">
                        <div className="param">
                            <span>Dew Point</span>
                            <span>{data.selectedCity.dewPoint}C°</span>
                        </div>
                        <div className="param">
                            <span>Pressure</span>
                            <span>{data.selectedCity.pressure} mb</span>
                        </div>
                        <div className="param">
                            <span>Cloud Cover</span>
                            <span>{data.selectedCity.clouds}%</span>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default CityWeatherInfo;