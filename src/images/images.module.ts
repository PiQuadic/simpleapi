import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './entities/image.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [ SequelizeModule.forFeature([ Image ]) ],
  controllers: [ ImagesController ],
  providers: [ ImagesService ],
})
export class ImagesModule {}
