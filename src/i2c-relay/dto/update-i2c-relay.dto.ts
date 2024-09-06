import { IsIn, IsNotEmpty } from 'class-validator';

// normally closed switch is ON in position 0
export const RelayPosition = {
  ON: 0,
  OFF: 1
};

export const RelayEnabled = {
  ON: 1,
  OFF: 0
};

export class UpdateI2cRelayDto {

  @IsNotEmpty()
  @IsIn(['ON', 'OFF'])
  position: string;

}
