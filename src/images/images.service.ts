import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

const libcamera = require('node-libcamera');

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
    const cam_id = (camera_id) ? camera_id : 'main';

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

    libcamera.still({
      output: path, // output file path
      quality: this.imageDefaults.quality,
      timeout: this.cameraTimeout, // timeout before taking the picture
      width: this.imageDefaults.width, // image width
      height: this.imageDefaults.height, // image height
      thumb: JSON.parse(this.imageDefaults.thumbnail), // convert it back for camera lib
    })

    return image;
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
  
  async log(camera_id: string) {
    return await this.create(camera_id);
  }
}
  /* Example
   *
const libcamera = require('node-libcamera')

// basic example
libcamera.still({ output: 'test.jpg' })
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})

// example with options
libcamera.still({
  output: 'images/test.jpg', // output file path
  timeout: 2000, // timeout before taking the picture
  width: 640, // image width
  height: 480, // image height
})
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})
*/
