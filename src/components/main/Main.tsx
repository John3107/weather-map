import React, {useEffect, useState} from 'react';
import './Main.css';
import {Button, TextField} from "@material-ui/core";
import Card from "./card/Card";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addCityTC, setCitiesTC} from "../../bll/app-reducer";
import {CityType} from "../../types/types";

const Main = () => {

    const data = useAppSelector()
    const dispatch = useAppDispatch()
    const [enteredTitle, setEnteredTitle] = useState<string>('')
    const [selectedTitle, setSelectedTitle] = useState<string>('')

    useEffect(() => {
        dispatch(setCitiesTC(enteredTitle))
    }, [enteredTitle])

    const addCityHandler = () => {
        if (!enteredTitle) {
            alert('Enter city title!')
            return
        }
        // dispatch(setCitiesTC(title))
        // setTitle('')
    }

    const selectCityHandler = (selectedTitle: CityType) => {
        setSelectedTitle(selectedTitle.name)
        dispatch(addCityTC(selectedTitle))
    }

    return (
        <div>
            <div className="Add">
                <div className="input">
                    <TextField id="outlined-basic"
                               label="Enter city name"
                               variant="outlined"
                               onChange={(enteredTitle) => setEnteredTitle(enteredTitle.target.value)}
                               value={selectedTitle ? selectedTitle : enteredTitle}
                    />
                    <Button variant="contained" color="primary" onClick={addCityHandler}>Add</Button>
                </div>
                <div className="context">
                    {
                        data.citiesContext.map((el, i) => {
                            return (
                                <div className="city" key={i} onClick={() => selectCityHandler(el)}>
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
                data.cities.map((el, i) => <Card name={el.name} key={i}/>)
            }</div>
        </div>
    );
}

export default Main;