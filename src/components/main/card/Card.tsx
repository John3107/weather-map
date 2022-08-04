import React from 'react';
import './Card.css';
import {Paper} from "@material-ui/core";
import {CityType} from "../../../types/types";


const Card = (props: CityType) => {

    const { title } = props

    return (
        <div className="Card">
            <Paper elevation={3} className="Paper">
                <span>{title}</span>
            </Paper>
        </div>
    );
}

export default Card;