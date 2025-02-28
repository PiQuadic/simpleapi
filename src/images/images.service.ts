import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from "sequelize";
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { Cron } from '@nestjs/schedule';

const libcamera = require('node-libcamera');

const DEFAULT_CAMERA = "camera1";

@Injectable()
export class ImagesService {

  constructor(
    @InjectModel(Image)
    private imageRepository: typeof Image,
  ) {}

  private readonly logger = new Logger(ImagesService.name);
  private readonly cameraTimeout = 1000;
  private readonly imageDefaults: Partial<Image> = {
    height: 480,
    width: 640,
    quality: 100,
    imagetype: 'jpg',
    path: 'awaitingid',
    thumbnail: JSON.stringify({
      width: 142,
      height: 100,
      quality: 93 
    }),
  };

  async create(camera_id: string): Promise<Image> {
    const cam_id = (camera_id) ? camera_id : 'camera1';

    // pre create to get id
    const image = await this.imageRepository.create({...this.imageDefaults, camera_id: cam_id});
    // then create the name and path
    const filename = `${image.id}.${this.imageDefaults.imagetype}`;
    const path = `images/${cam_id}/`;
    const uri = path + filename;
    this.logger.log(uri);
    image.set({
      path: path,
      filename: filename,
      uri: uri,
    });
    await image.save();
    this.logger.log(image);

    libcamera.still({
      output: uri, // output file path
      quality: this.imageDefaults.quality,
      timeout: this.cameraTimeout, // timeout before taking the picture
      width: this.imageDefaults.width, // image width
      height: this.imageDefaults.height, // image height
      thumb: JSON.parse(this.imageDefaults.thumbnail), // convert it back for camera lib
    })
    .then((res) => this.logger.log(res))
    .catch((err) => this.logger.log(err));


    this.logger.log(image);
    return image;
  }

  findAll() {
    this.logger.log('findAll');
    return `This action returns all images`;
  }

  findOne(id: string) {
    this.logger.log(`findOne ${id}`);
    return `This action returns a #${id} image`;
  }

  async findNewest(id: string) {
    this.logger.log(`Finding Newest Image for camera: ${id}`);
    const newestImage = await this.imageRepository.findOne({
      where: {camera_id: id},
      order: [[ 'dt', 'DESC']]
    });

    return newestImage;
  }

  async getLogs(id: string, hours: string) {
    this.logger.log(`id: ${id} hours: ${hours}`);
    const hrs = parseInt(hours);

    this.logger.log(`Finding Newest Image for camera: ${id}`);

    const from = new Date();
    const strFrom = `${from.getDate()}/${(from.getMonth()+1)}-${from.getHours()}:${from.getMinutes()}`

    const to = new Date(new Date().valueOf() - hrs * 60 * 60 * 1000);
    const strTo = `${to.getDate()}/${(to.getMonth()+1)}-${to.getHours()}:${to.getMinutes()}`

    this.logger.log( `From: ${strFrom} To: ${strTo}`);

    const validId = ['camera1'];
    
    return await this.imageRepository.findAll({
      where: {
        camera_id: {
          [Op.eq]: validId.includes(id) ? id : validId[0]
        },
        dt: {
          [Op.lt]: from,
          [Op.gt]: to 
        }
      }
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    this.logger.log(`Update ${id}`);
    this.logger.log( updateImageDto );
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    this.logger.log(`REMOVE ${id}`);
    return `This action removes a #${id} image`;
  }
  
  async log(camera_id: string) {
    this.logger.log(`log  ${camera_id}`);
    return await this.create(camera_id);
  }

  @Cron('*/5 * * * *')
  handleCron() {
    this.logger.log('Cron Initiated');
    const junk = this.log(DEFAULT_CAMERA);
  }
}
