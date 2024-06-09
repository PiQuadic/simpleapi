import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateImageDto {

  @IsString()
  id: string

}
