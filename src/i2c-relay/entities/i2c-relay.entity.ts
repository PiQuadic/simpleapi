import { CreatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'relay',
})

export class I2cRelay extends Model {

  @Column
  relay_id: string;

  @Column
  name: string;

  @Column
  lastvalue: string;

  @Column({
    type: DataTypes.DATE,
  })
  lastlog: Date;

  @Column
  enabled: number;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  createdAt: Date;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  updatedAt: Date;
}

