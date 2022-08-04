import React, {ChangeEvent, useState} from 'react';
import './Main.css';
import {Button, TextField} from "@material-ui/core";
import Card from "./card/Card";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setCitiesTC} from "../../bll/app-reducer";

const Main = () => {

    const data = useAppSelector()
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')


    const addCityHandler = () => {
        if (!title) {
            alert('Enter city title!')
            return
        }
        dispatch(setCitiesTC(title))
        setTitle('')
    }

    return (
        <div>
            <div className="Add">
                <TextField id="outlined-basic"
                           label="Enter city name"
                           variant="outlined"
                           onChange={(title) => setTitle(title.target.value)}
                           value={title}
                />
                <Button variant="contained" color="primary" onClick={addCityHandler}>Add</Button>
            </div>
            <div className="Cards">{
                data.cities.map((el, i) => <Card title={el.title} key={i}/>)
            }</div>
        </div>
    );
}

export default Main;