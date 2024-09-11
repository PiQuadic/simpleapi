
export interface DhtReading {
  temperature: string;
  humidity: string;
}

export interface DhtSensorLog {
  sensor_id: string;
  name: string;
  value: string;
  dt: Date;
}

export interface DhtSensorLogs {
  name: string;
  data: { value: string, dt: Date }[];
}
