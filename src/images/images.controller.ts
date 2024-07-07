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
  }
  
  @Get('newest/:id')
  async findNewest(@Param('id') id: string) {
    this.logger.log(`Find Newest Image for Camera: ${id}`);
    return await this.imagesService.findNewest(id);
  }

  @Get('log/:id')
  log(@Param('id') camera_id: string) : Promise<Image> {
    this.logger.log(camera_id);
    return this.imagesService.log(camera_id);
  }

  @Get('logs/:id/:hours')
  async imagesLogs(@Param('id') id: string, @Param('hours') hours: string): Promise<Image[]> {
    this.logger.log(`imageLogs: ${id} hours: ${hours}`);
    return this.imagesService.getLogs(id, hours);
  } 

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Get ${id}`);
    return await this.imagesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('delete');
    return await this.imagesService.remove(+id);
  }

}
