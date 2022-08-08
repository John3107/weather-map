import {CityType} from "../types/types";
import {AppThunk} from "./store";
import {weatherAPI} from "../api/api";

const initialState: InitialStateType = {
    cities: [],
    citiesContext: []
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CITIES':
            return {...state, cities: [...state.cities, action.city]}
        case 'CITIES-CONTEXT':
            return {...state, citiesContext: action.citiesContextArray}
        default:
            return state
    }
}

export const initialCitiesDataTC = (): AppThunk => (dispatch) => {
    const getCities = localStorage.getItem('cities-list')
    if (getCities) {
        dispatch(setCitiesAC(JSON.parse(getCities)))
    }
}

export const addCityTC = (newCity: CityType): AppThunk => (dispatch) => {
    dispatch(setCitiesContextAC([]))
    weatherAPI.getCityWeather(newCity.lat, newCity.lon)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    // const getCities = localStorage.getItem('cities-list')
    // if (getCities) {
    //     dispatch(setCitiesAC(JSON.parse(getCities)))
    // }
}

export const setCitiesTC = (title: string): AppThunk => (dispatch) => {
    if (!title) return dispatch(setCitiesContextAC([]))
    weatherAPI.getCitiesWeather(title)
        .then((res) => {
            console.log(res.data)
            dispatch(setCitiesContextAC(res.data))
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

export const setCitiesAC = (city: CityType) => ({type: 'CITIES', city} as const)
export const setCitiesContextAC = (citiesContextArray: CityType[]) =>
    ({type: 'CITIES-CONTEXT', citiesContextArray} as const)

export type setCitiesActionType = ReturnType<typeof setCitiesAC>
export type setCitiesContextActionType = ReturnType<typeof setCitiesContextAC>

export type InitialStateType = {
    cities: CityType[],
    citiesContext: CityType[]
}

type ActionsType = setCitiesActionType | setCitiesContextActionType