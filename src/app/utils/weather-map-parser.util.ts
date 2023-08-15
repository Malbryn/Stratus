import { WeatherMapDto } from '../types/weather-map-dto';
import { RadarMap } from '../types/radar-map';

export class WeatherMapParserUtil {
    static parseWeatherMapData(weatherMap: WeatherMapDto): RadarMap {
        return {
            generated: weatherMap.generated,
            host: weatherMap.host,
            currentTileIndex: 0,
            tiles: [...weatherMap.radar.past, ...weatherMap.radar.nowcast],
        } as RadarMap;
    }
}
