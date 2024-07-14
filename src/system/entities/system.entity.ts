import { CreatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'system',
})

export class System extends Model {

  @Column
  system_id: string;

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
