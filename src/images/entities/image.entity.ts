import { CreatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'images',
})

export class Image extends Model {
  @Column
  image_id: string;
  
  @Column
  camera_id: string;

  @Column
  path: string;

  @Column
  filename: string;

  @Column
  uri: string;

  @Column
  width: number;

  @Column
  height: number;

  @Column
  quality: string;

  @Column
  thumnail: string;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  })
  dt: Date;
}


