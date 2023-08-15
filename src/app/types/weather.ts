import { CurrentWeather } from './current-weather';
import { ForecastWeather } from './forecast-weather';

export type Weather = {
    current: CurrentWeather;
    forecast: ForecastWeather[];
};
