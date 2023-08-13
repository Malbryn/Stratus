import { MapTile } from './weather-map-dto';

export type RadarMap = {
    generated: number;
    host: string;
    tiles: MapTile[];
};
