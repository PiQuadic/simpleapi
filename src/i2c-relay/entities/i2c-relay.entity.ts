import { CreatedAt, Column, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

const notNullString = { type: DataType.STRING, allowNull: false };
@Table({ tableName: 'relay' })
export class I2cRelay extends Model {

  @Column(notNullString)
  relay_id: string;

  @Column(notNullString)
  name: string;

  @Column({ allowNull: false, defaultValue: 'OFF' })
  position: string;

  @Column({ allowNull: false, defaultValue: 1 })
  enabled: number;

  @UpdatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  updatedAt: Date;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  createdAt: Date;
}

