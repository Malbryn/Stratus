export type MapTile = {
    time: number;
    path: string;
};

export type WeatherMapDto = {
    version: string;
    generated: number;
    host: string;
    radar: {
        past: MapTile[];
        nowcast: MapTile[];
    };
    satellite: {
        infrared: MapTile[];
    };
};
