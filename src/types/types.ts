export type CityType = {
    country?: string
    lat: number
    lon: number
    name: string
    state?: string
}

export type CityWeatherType = {
    name: string,
    country: string | undefined,
    temp: number,
    description: string,
    icon: string,
    id: string,
    lat: number,
    lon: number,
    date: string,
    windSpeed: number,
    humidity: number,
    dewPoint: number,
    pressure: number,
    clouds: number,
    windDeg: number
}