import {CityType, CityWeatherType} from "../types/types";
import {AppThunk} from "./store";
import {weatherAPI} from "../api/api";

const initialState: InitialStateType = {
    cities: [],
    citiesContext: []
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CITIES':
            return {...state, cities: action.citiesList}
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
    const citiesList = localStorage.getItem('cities-list')
    const citiesListParsed = citiesList && JSON.parse(citiesList)
    weatherAPI.getCityWeather(newCity.lat, newCity.lon)
        .then((res) => {
            const cityWeather = {
                id: String(res.data.lon) + String(res.data.lat),
                city: newCity.name,
                country: newCity.country,
                temp: Math.round(res.data.current.temp / 10.59),
                description: res.data.current.weather[0].description,
                icon: res.data.current.weather[0].icon,
                lat: res.data.lat,
                lon: res.data.lon
            }
            if (citiesListParsed[0]) {
                const searchCity = citiesListParsed.find((el: CityWeatherType) => el.id === cityWeather.id)
                let addCity
                if (searchCity) {
                    addCity = citiesListParsed.map((el: CityWeatherType) => el.id === cityWeather.id
                        ? ({...cityWeather})
                        : el)
                } else {
                    addCity = [...citiesListParsed, cityWeather]
                }
                localStorage.setItem('cities-list', JSON.stringify(addCity))
                dispatch(setCitiesAC(addCity))
            } else {
                localStorage.setItem('cities-list', JSON.stringify([cityWeather]))
                dispatch(setCitiesAC([cityWeather]))
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

export const citiesContextTC = (title: string): AppThunk => (dispatch) => {
    if (!title) return dispatch(setCitiesContextAC([]))
    weatherAPI.getCitiesWeather(title)
        .then((res) => {
            dispatch(setCitiesContextAC(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
}

export const deleteCardTC = (cardId: string): AppThunk => (dispatch) => {
    const citiesList = localStorage.getItem('cities-list')
    const citiesListParsed = citiesList && JSON.parse(citiesList)
    const citiesListFiltered = citiesListParsed.filter((el: CityWeatherType) => el.id !== cardId)
    localStorage.setItem('cities-list', JSON.stringify(citiesListFiltered))
    dispatch(setCitiesAC(citiesListFiltered))
}

export const setCitiesAC = (citiesList: CityWeatherType[]) => ({type: 'CITIES', citiesList} as const)
export const setCitiesContextAC = (citiesContextArray: CityType[]) =>
    ({type: 'CITIES-CONTEXT', citiesContextArray} as const)

export type CitiesActionType = ReturnType<typeof setCitiesAC>
export type CitiesContextActionType = ReturnType<typeof setCitiesContextAC>

export type InitialStateType = {
    cities: CityWeatherType[],
    citiesContext: CityType[]
}

type ActionsType = CitiesActionType | CitiesContextActionType