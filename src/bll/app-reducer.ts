import {CityType} from "../types/types";
import {AppThunk} from "./store";
import {weatherAPI} from "../api/api";

const initialState: InitialStateType = {
      cities: []
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'GET-CITIES':
            return {...state, cities: action.citiesArray}
        default:
            return state
    }
}

export const getCitiesTC = (): AppThunk => (dispatch) => {
    const getCities = localStorage.getItem('cities-list')
    if(getCities){
        dispatch(setCitiesAC(JSON.parse(getCities)))
    }
}

export const setCitiesTC = (title: string): AppThunk => (dispatch) => {
    weatherAPI.getCityWeather(title)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    // const getCities = localStorage.getItem('cities-list')
    // if(getCities){
    //     let getCitiesParsed = JSON.parse(getCities)
    //     getCitiesParsed.push(city)
    //     localStorage.setItem('cities-list', JSON.stringify(getCitiesParsed))
    //     dispatch(setCitiesAC(getCitiesParsed))
    // } else {
    //     localStorage.setItem('cities-list', JSON.stringify([city]))
    //     dispatch(setCitiesAC([city]))
    // }
}

export const setCitiesAC = (citiesArray: CityType[]) => ({type: 'GET-CITIES', citiesArray} as const)

export type setCitiesActionType = ReturnType<typeof setCitiesAC>

export type InitialStateType = {
    cities: CityType[]
}

type ActionsType = setCitiesActionType