import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/',
    withCredentials: true,
    headers: {
        'API-KEY': '75c9c6eb689b6cfdc81e95bff0e5a073'
    }
})

export const weatherAPI = {
    getCityWeather(cityName: string) {
        return instance.get<AxiosResponse>(`geo/1.0/direct?q=${cityName}&limit=5&appid=75c9c6eb689b6cfdc81e95bff0e5a073`);
    }
}