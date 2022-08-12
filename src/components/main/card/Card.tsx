import React, {useEffect, useState} from 'react';
import './Card.css';
import {Paper} from "@material-ui/core";
import {CityWeatherType} from "../../../types/types";
import {Refresh} from '@material-ui/icons';
import {Delete} from '@material-ui/icons';
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {
    deleteCardTC,
    refreshCityTC,
    selectedCityTC,
    setDeletedCardAC
} from "../../../bll/app-reducer";
import {Navigate, useNavigate} from "react-router-dom";
import CityWeatherInfo from "../../cityWeatherInfo/CityWeatherInfo";

const Card = (props: CityWeatherType) => {
    const data = useAppSelector()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {name, country, temp, description, icon, id, lon, lat} = props
    const [date, setDate] = useState('')

    useEffect(() => {
        setDate(String(new Date()).split('GMT')[0])
    }, [])

    const deleteCardHandler = () => {
        dispatch(deleteCardTC(id))
        const removeCard = data.cities.filter(el => el.id !== id)
        dispatch(setDeletedCardAC(removeCard))
    }

    const refreshDataHandler = () => {
        setDate(String(new Date()).split('GMT')[0])
        dispatch(refreshCityTC({name, country, lon, lat}))
    }

    const toInfo = () => {
        dispatch(selectedCityTC(props))
        navigate(`/city/${name}`)
        return <Navigate to={`/city/${name}`}/> && <CityWeatherInfo/>
    }

    return (
        <div className="card" data-testid="card-test">
            <Paper elevation={3} className="paper">
                <div className="main" onClick={toInfo}>
                    <div className="left-side">
                        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
                        <div>
                            <span style={{fontSize: '26px'}}>{temp}C°</span>
                            <span>{description}</span>
                        </div>
                    </div>
                    <div className="right-side">
                        <div>
                            <span>{name}, </span>
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