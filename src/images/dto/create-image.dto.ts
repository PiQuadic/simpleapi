import { IsDate, IsInt, IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {

  @IsString()
  image_id: string;

  @IsString()
  camera_id: string;

  @IsString()
  path: string;

  @IsString()
  filename: string;

  @IsString()
  uri: string;

  @IsInt()
  width: number;

  @IsInt()
  height: number;

  @IsInt()
  quality: number;

  @IsJSON()
  thumbnail: string;

  @IsDate()
  dt: Date;

}
