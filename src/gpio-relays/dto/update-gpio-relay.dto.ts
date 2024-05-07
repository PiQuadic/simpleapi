import { PartialType } from '@nestjs/mapped-types';
import { CreateGpioRelayDto } from './create-gpio-relay.dto';

export class UpdateGpioRelayDto extends PartialType(CreateGpioRelayDto) {}
