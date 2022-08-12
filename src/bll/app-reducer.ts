import {CityType, CityWeatherType} from "../types/types";
import {AppThunk} from "./store";
import {weatherAPI} from "../api/api";

const initialState: InitialStateType = {
    cities: [],
    citiesContext: [],
    selectedCity: {
        name: '',
        country: '',
        temp: 0,
        description: '',
        icon: '',
        id: '',
        lat: 0,
        lon: 0,
        date: '',
        windSpeed: 0,
        humidity: 0,
        dewPoint: 0,
        pressure: 0,
        clouds: 0,
        windDeg: 0
    },
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CITIES':
            return {...state, cities: [...state.cities, action.citiesList]}
        case 'CITIES-CONTEXT':
            return {...state, citiesContext: action.citiesContextArray}
        case 'SELECTED-CITY':
            return {...state, selectedCity: action.citySelected}
        case 'INITIALIZED':
            return {...state, initialized: action.init}
        case 'DELETED-CARD':
            return {...state, cities: action.withoutDeletedCard}
        default:
            return state
    }
}

export const initialCitiesDataTC = (): AppThunk => (dispatch) => {
    const getCities = localStorage.getItem('cities-list')
    const getCitiesParsed = getCities && JSON.parse(getCities)
    if (getCitiesParsed) {
        (async () => {
            for (let i = 0; i < getCitiesParsed.length; i++) {
                await dispatch(addCityTC(getCitiesParsed[i]))
            }
        })();
    }
}

export const addCityTC = (newCity: CityType): AppThunk => (dispatch) => {
    dispatch(setInitializedAC(true))
    dispatch(setCitiesContextAC([]))
    const citiesList = localStorage.getItem('cities-list')
    const citiesListParsed = citiesList && JSON.parse(citiesList)
    weatherAPI.getCityWeather(newCity.lat, newCity.lon)
        .then((res) => {
            const cityWeather = {
                id: String(res.data.lon) + String(res.data.lat),
                name: newCity.name,
                country: newCity.country,
                temp: Math.round(res.data.current.temp / 10.59),
                description: res.data.current.weather[0].description,
                icon: res.data.current.weather[0].icon,
                lat: res.data.lat,
                lon: res.data.lon,
                date: String(new Date()),
                windSpeed: res.data.current.wind_speed,
                humidity: res.data.current.humidity,
                dewPoint: Math.round(res.data.current.dew_point / 10.59),
                pressure: res.data.current.pressure,
                clouds: res.data.current.clouds,
                windDeg: res.data.current.wind_deg
            }
            if (citiesListParsed) {
                const searchCity = citiesListParsed.find((el: CityWeatherType) =>
                    String(el.lon) + String(el.lat) === cityWeather.id)
                !searchCity && localStorage.setItem('cities-list', JSON.stringify([...citiesListParsed,
                    {...newCity, lon: res.data.lon, lat: res.data.lat}]))
            } else {
                localStorage.setItem('cities-list', JSON.stringify([{
                    ...newCity,
                    lon: res.data.lon,
                    lat: res.data.lat
                }]))
            }
            dispatch(setCitiesAC(cityWeather))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setInitializedAC(false))
        })
}

export const refreshCityTC = (newCity: CityType): AppThunk => (dispatch) => {
    const citiesList = localStorage.getItem('cities-list')
    const citiesListParsed = citiesList && JSON.parse(citiesList)
    if (citiesListParsed) {
        citiesListParsed.forEach((el: CityWeatherType) => el.id === String(newCity.lon) + String(newCity.lat)
            ? dispatch(addCityTC(newCity)) : el)
    }
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

export const deleteCardTC = (cardId: string): AppThunk => () => {
    const citiesList = localStorage.getItem('cities-list')
    const citiesListParsed = citiesList && JSON.parse(citiesList)
    const citiesListFiltered = citiesListParsed.filter((el: CityWeatherType) =>
        String(el.lon) + String(el.lat) !== cardId)
    localStorage.setItem('cities-list', JSON.stringify(citiesListFiltered))
}

export const selectedCityInitTC = (): AppThunk => (dispatch) => {
    const currentCity = localStorage.getItem('selected-city')
    const currentCityParsed = currentCity && JSON.parse(currentCity)
    if (currentCity) {
        weatherAPI.getCityWeather(currentCityParsed.lat, currentCityParsed.lon)
            .then((res) => {
                const cityWeather = {
                    id: String(res.data.lon) + String(res.data.lat),
                    name: currentCityParsed.name,
                    country: currentCityParsed.country,
                    temp: Math.round(res.data.current.temp / 10.59),
                    description: res.data.current.weather[0].description,
                    icon: res.data.current.weather[0].icon,
                    lat: res.data.lat,
                    lon: res.data.lon,
                    date: String(new Date()),
                    windSpeed: res.data.current.wind_speed,
                    humidity: res.data.current.humidity,
                    dewPoint: Math.round(res.data.current.dew_point / 10.59),
                    pressure: res.data.current.pressure,
                    clouds: res.data.current.clouds,
                    windDeg: res.data.current.wind_deg
                }
                dispatch(setSelectedCityAC(cityWeather))
            })
    }
}

export const selectedCityTC = (currentCity: CityWeatherType): AppThunk => (dispatch) => {
    localStorage.setItem('selected-city', JSON.stringify(currentCity))
    dispatch(setSelectedCityAC(currentCity))
}

export const setCitiesAC = (citiesList: CityWeatherType) => ({type: 'CITIES', citiesList} as const)
export const setInitializedAC = (init: boolean) => ({type: 'INITIALIZED', init} as const)
export const setSelectedCityAC = (citySelected: CityWeatherType) =>
    ({type: 'SELECTED-CITY', citySelected} as const)
export const setCitiesContextAC = (citiesContextArray: CityType[]) =>
    ({type: 'CITIES-CONTEXT', citiesContextArray} as const)
export const setDeletedCardAC = (withoutDeletedCard: CityWeatherType[]) =>
    ({type: 'DELETED-CARD', withoutDeletedCard} as const)

export type CitiesActionType = ReturnType<typeof setCitiesAC>
export type InitializedActionType = ReturnType<typeof setInitializedAC>
export type SelectedCityActionType = ReturnType<typeof setSelectedCityAC>
export type CitiesContextActionType = ReturnType<typeof setCitiesContextAC>
export type DeletedCardActionType = ReturnType<typeof setDeletedCardAC>

export type InitialStateType = {
    cities: CityWeatherType[],
    citiesContext: CityType[],
    selectedCity: CityWeatherType,
    initialized: boolean
}

type ActionsType = CitiesActionType
    | CitiesContextActionType
    | SelectedCityActionType
    | InitializedActionType
    | DeletedCardActionType