
export class CreateI2cRelayDto {

  relay_id: string;

  name: string;

  lastvalue: string;

  lastlog: Date;

  enabled: number;

  createdAt: Date;

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
