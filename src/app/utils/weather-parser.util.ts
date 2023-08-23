import {
    CurrentWeatherDto,
    ForecastDto,
    ForecastHourDto,
    WeatherDto,
} from '../types/weather-dto';
import { CurrentWeather } from '../types/current-weather';
import { Weather } from '../types/weather';
import {
    ForecastAstro,
    ForecastDay,
    ForecastHour,
    ForecastWeather,
} from '../types/forecast-weather';
import { AlertDto } from '../types/weather-alert-dto';
import { WeatherAlert } from '../types/weather-alert';

export class WeatherParserUtil {
    static parseWeatherData(weatherDto: WeatherDto): Weather {
        return {
            current: WeatherParserUtil.parseCurrentWeatherData(weatherDto),
            forecast: WeatherParserUtil.parseForecastWeatherData(weatherDto),
        } as Weather;
    }

    static parseAlertData(weatherAlertDto: AlertDto[]): WeatherAlert[] {
        const alerts: WeatherAlert[] = [];

        weatherAlertDto.forEach((currentAlert) =>
            alerts.push({
                senderName: currentAlert.sender_name,
                start: currentAlert.start,
                end: currentAlert.end,
                event: currentAlert.event,
                description: currentAlert.description,
                tags: currentAlert.tags,
            })
        );

        return alerts;
    }

    private static parseCurrentWeatherData(
        weatherDto: WeatherDto
    ): CurrentWeather {
        const current: CurrentWeatherDto = weatherDto.current;

        return {
            lastUpdatedEpoch: current.last_updated_epoch,
            lastUpdated: current.last_updated,
            isDay: current.is_day === 1,
            temperature: current.temp_c,
            feelsLike: current.feelslike_c,
            wind: current.wind_kph,
            windGust: current.gust_kph,
            windDirection: current.wind_dir,
            windDegree: current.wind_degree,
            pressure: current.pressure_mb,
            precipitation: current.precip_mm,
            humidity: current.humidity,
            cloud: current.cloud,
            visibility: current.vis_km,
            uv: current.uv,
            condition: {
                text: current.condition.text,
                icon: current.condition.icon,
                code: current.condition.code,
            },
        } as CurrentWeather;
    }

    private static parseForecastWeatherData(
        weatherDto: WeatherDto
    ): ForecastWeather[] {
        const forecastDay: ForecastDto[] = weatherDto.forecast.forecastday;
        const forecastWeather: ForecastWeather[] = [];

        forecastDay.forEach((forecastDto: ForecastDto) => {
            const forecastDay: ForecastWeather = {
                date: forecastDto.date,
                dateEpoch: forecastDto.date_epoch,
                day: WeatherParserUtil.parseForecastDay(forecastDto),
                astro: WeatherParserUtil.parseForecastAstro(forecastDto),
                hour: WeatherParserUtil.parseForecastHours(forecastDto),
            } as ForecastWeather;

            forecastWeather.push(forecastDay);
        });

        return forecastWeather;
    }

    private static parseForecastDay(forecastDto: ForecastDto): ForecastDay {
        return {
            maxTemp: forecastDto.day.maxtemp_c,
            minTemp: forecastDto.day.mintemp_c,
            avgTemp: forecastDto.day.avgtemp_c,
            maxWind: forecastDto.day.maxwind_kph,
            totalPrecipitation: forecastDto.day.totalprecip_mm,
            totalSnow: forecastDto.day.totalsnow_cm,
            avgVisibility: forecastDto.day.avgvis_km,
            avgHumidity: forecastDto.day.avghumidity,
            willItRain: forecastDto.day.daily_will_it_rain === 1,
            chanceOfRain: forecastDto.day.daily_chance_of_rain,
            willItSnow: forecastDto.day.daily_will_it_snow === 1,
            chanceOfSnow: forecastDto.day.daily_chance_of_snow,
            condition: {
                text: forecastDto.day.condition.text,
                icon: forecastDto.day.condition.icon,
                code: forecastDto.day.condition.code,
            },
            uv: forecastDto.day.uv,
        } as ForecastDay;
    }

    private static parseForecastAstro(forecastDto: ForecastDto): ForecastAstro {
        return {
            sunrise: forecastDto.astro.sunrise,
            sunset: forecastDto.astro.sunset,
        } as ForecastAstro;
    }

    private static parseForecastHours(
        forecastDto: ForecastDto
    ): ForecastHour[] {
        const forecastHours: ForecastHour[] = [];

        forecastDto.hour.forEach((forecastHourDto: ForecastHourDto) => {
            const forecastHour: ForecastHour = {
                timeEpoch: forecastHourDto.time_epoch,
                time: forecastHourDto.time,
                temperature: forecastHourDto.temp_c,
                isDay: forecastHourDto.is_day,
                condition: {
                    text: forecastHourDto.condition.text,
                    icon: forecastHourDto.condition.icon,
                    code: forecastHourDto.condition.code,
                },
                wind: forecastHourDto.wind_kph,
                windGust: forecastHourDto.gust_kph,
                windDegree: forecastHourDto.wind_degree,
                windDirection: forecastHourDto.wind_dir,
                pressure: forecastHourDto.pressure_mb,
                precipitation: forecastHourDto.precip_mm,
                humidity: forecastHourDto.humidity,
                cloudCover: forecastHourDto.cloud,
                feelsLike: forecastHourDto.feelslike_c,
                windChill: forecastHourDto.windchill_c,
                heatIndex: forecastHourDto.heatindex_c,
                dewPoint: forecastHourDto.dewpoint_c,
                willItRain: forecastHourDto.will_it_rain === 1,
                chanceOfRain: forecastHourDto.chance_of_rain,
                willItSnow: forecastHourDto.will_it_snow === 1,
                chanceOfSnow: forecastHourDto.chance_of_snow,
                visibility: forecastHourDto.vis_km,
                uv: forecastHourDto.uv,
            };

            forecastHours.push(forecastHour);
        });

        return forecastHours;
    }
}
