import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
  ) {}
  private readonly logger = new Logger(ImagesController.name);

  @Get()
  async findAll() {
    return await this.imagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.imagesService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.imagesService.remove(+id);
  }

  @Get('log')
  async log(@Param('id') camera_id: string) : Promise<Image> {
    return await this.imagesService.log(camera_id);
  }
}
