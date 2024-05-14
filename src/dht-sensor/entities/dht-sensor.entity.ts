import { CreatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'sensor',
})

export class DhtSensorLog extends Model {

  @Column
  sensor_id: string;

  @Column
  name: string;

  @Column
  value: string;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  dt: Date;
}

