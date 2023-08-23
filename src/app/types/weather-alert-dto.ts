export type WeatherAlertDto = {
    alerts: AlertDto[];
};

export type AlertDto = {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
};
