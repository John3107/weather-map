export type CityType = {
    country?: string
    lat: number
    local_names?: object
    lon: number
    name: string
    state?: string
}

export type CityWeatherType = {
    city: string,
    country: string | undefined,
    temp: number,
    description: string,
    icon: string,
    id: string,
    lat: number,
    lon: number
}