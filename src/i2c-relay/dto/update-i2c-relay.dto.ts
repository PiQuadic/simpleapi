import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// normally closed switch is ON in position 0
export enum RelayPosition {
  "ON" = 0,
  "OFF" = 1
}

export enum RelayEnabled {
  ON = 1,
  OFF = 0
}

export class UpdateI2cRelayDto {

  @IsNotEmpty()
  @IsEnum(RelayPosition)
  position: RelayPosition;

}
