import { CreatedAt, Column, Model, Table, UpdatedAt } from 'sequelize-typescript';
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

  @UpdatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  updatedAt: Date;
}

/*
 *
insert into relay (
  relay_id,
  name,
  lastvalue,
  lastlog,
  enabled,
  createdAt,
  updatedAt
) values (
  'A', // A-D
  'Switch 1', 1-4
  'off',
  CURRENT_TIMESTAMP,
  1,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
*/
