import { CreatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'relay_log',
})

export class I2cRelayReading extends Model {

  @Column
  relay_id: string;

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
