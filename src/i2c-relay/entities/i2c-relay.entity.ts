import { CreatedAt, Column, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'relay' })
export class I2cRelay extends Model {

  @Column
  relay_id: string;

  @Column
  name: string;

  @Column
  value: string;

  @Column
  enabled: number;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  updatedAt: Date;
}

@Table({ tableName: 'relay_log' })
export class I2cRelayLog extends Model {
  @Column
  relay_id: string;

  @Column
  value: string;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  createdAt: Date;
}