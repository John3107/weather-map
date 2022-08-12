import axios, {AxiosResponse} from 'axios'

const API_KEY = '46f02c10d6e9bd84661beaf69cf67446'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/'
})

export const weatherAPI = {
    getCitiesWeather(cityName: string) {
        return instance.get<AxiosResponse, AxiosResponse>(`geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`);
    },
    getCityWeather(lat: number, lon: number) {
        return instance.get<AxiosResponse, AxiosResponse>
        (`data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${API_KEY}`);
    }
}