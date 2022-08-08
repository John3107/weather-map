import React from 'react';
import './Card.css';
import {Paper} from "@material-ui/core";

type PropsType = {
    name: string
}

const Card = (props: PropsType) => {

    const { name } = props

    return (
        <div className="Card">
            <Paper elevation={3} className="Paper">
                <span>{name}</span>
            </Paper>
        </div>
    );
}

export default Card;