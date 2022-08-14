import React, {useEffect, useState} from 'react';
import './Main.css';
import {TextField} from "@material-ui/core";
import Card from "./card/Card";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addCityTC, citiesContextTC} from "../../bll/app-reducer";
import {CityType, CityWeatherType} from "../../types/types";
import {Clear} from '@material-ui/icons';

type PropsType = {
    toInfo?: (data: CityWeatherType, name: string) => void
}

const Main = ({toInfo}: PropsType) => {

    const data = useAppSelector()
    const dispatch = useAppDispatch()
    const [enteredTitle, setEnteredTitle] = useState<string>('')

    useEffect(() => {
        dispatch(citiesContextTC(enteredTitle))
    }, [enteredTitle, dispatch])

    const selectCityHandler = (selectedCity: CityType) => {
        setEnteredTitle('')
        dispatch(addCityTC(selectedCity))
    }

    const onBlurHandler = () => {
        setTimeout(() => dispatch(citiesContextTC('')), 100)
    }

    return (
        <div>
            <div className="add">
                <div className="input">
                    <TextField className="textField"
                               label="Enter city name"
                               variant="outlined"
                               onChange={(enteredTitle) => setEnteredTitle(enteredTitle.target.value)}
                               onBlur={onBlurHandler}
                               value={enteredTitle}
                    />
                    <Clear className="clear-icon" onClick={() => setEnteredTitle('')}/>
                </div>
                <div className="context">
                    {
                        data.citiesContext.map((el, i) => {
                            return (
                                <div className="city" key={i} onClick={() => selectCityHandler(el)}
                                     id="context-menu">
                                    <span>{el.name}</span>
                                    <div className="cityRightSide">
                                        <div>{el.state}</div>
                                        <div>{el.country}</div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div className="Cards">{
                data.cities.map((el) => <Card prop={el} key={el.id} toInfo={() => toInfo && toInfo(el, el.name)}/>)
            }</div>
        </div>
    );
}

export default Main;