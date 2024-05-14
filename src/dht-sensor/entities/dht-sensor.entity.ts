import { CreatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'sensor',
})

export class DhtSensorLog extends Model {

  @Column({
    type: DataTypes.TEXT,
    primaryKey: true
  })
  id: string;


  @Column
  name: string;

  @Column
  value: string;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  timestamp: Date;
}
