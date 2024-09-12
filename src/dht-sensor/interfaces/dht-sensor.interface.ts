
export interface DhtReading {
  temperature: string;
  humidity: string;
}

export interface DhtSensorLog {
  id: string;
  name: string;
  value: string;
  dt: Date;
}

export interface DhtSensorLogs {
  id: string;
  name: string;
  data: { value: string, dt: Date }[];
}
