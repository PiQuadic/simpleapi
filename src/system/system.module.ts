import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { System } from './entities/system.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ System ])],
  controllers: [SystemController],
  providers: [SystemService],
})

export class SystemModule {}
