import React, {useEffect, useState} from 'react';
import './Card.css';
import {Paper} from "@material-ui/core";
import {CityWeatherType} from "../../../types/types";
import {Refresh} from '@material-ui/icons';
import {Delete} from '@material-ui/icons';
import {useAppDispatch} from "../../../hooks/hooks";
import {addCityTC, deleteCardTC} from "../../../bll/app-reducer";

const Card = (props: CityWeatherType) => {

    const dispatch = useAppDispatch()
    const {city, country, temp, description, icon, id, lon, lat} = props
    const [date, setDate] = useState('')

    useEffect(() => {
        console.log(id)
        setDate(String(new Date()).split('GMT')[0])
    }, [])

    const deleteCardHandler = () => {
        dispatch(deleteCardTC(id))
    }

    const refreshDataHandler = () => {
        setDate(String(new Date()).split('GMT')[0])
        dispatch(addCityTC({name: city, country, lon, lat}))
    }

    return (
        <div className="card">
            <Paper elevation={3} className="paper">
                <div className="main">
                    <div className="left-side">
                        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
                        <div>
                            <span style={{fontSize: '26px'}}>{temp}C°</span>
                            <span>{description}</span>
                        </div>
                    </div>
                    <div className="right-side">
                        <div>
                            <span>{city}, </span>
                            <span>{country}</span>
                        </div>
                        <span>{date}</span>
                    </div>
                </div>
                <div className="actions">
                    <Refresh style={{cursor: 'pointer'}} onClick={refreshDataHandler}/>
                    <Delete style={{cursor: 'pointer'}} onClick={deleteCardHandler}/>
                </div>
            </Paper>
        </div>
    );
}

export default Card;