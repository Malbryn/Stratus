import { RadarColours } from '../app/utils/radar-colours.util';

export const environment = {
    production: true,
    mapboxApiKey: '<API_KEY>',
    weatherApiKey: '<API_KEY>',
    weatherApiUrl: 'https://api.weatherapi.com/v1',
    openWeatherMapApiKey: '<API_KEY>',
    openWeatherMapUrl: 'https://api.openweathermap.org/data/2.5/onecall',
    rainViewerApiUrl: 'https://api.rainviewer.com/public/weather-maps.json',
    defaultLocation: {
        shortName: 'Budapest',
        longName: 'Budapest, Hungary',
        latitude: 19.0403594,
        longitude: 47.4979937,
    },
    radarColour: RadarColours.DARK_SKY,
};
