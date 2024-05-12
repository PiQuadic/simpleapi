import { PartialType } from '@nestjs/mapped-types';
import { CreateI2cRelayDto } from './create-i2c-relay.dto';

export class UpdateI2cRelayDto extends PartialType(CreateI2cRelayDto) {}
