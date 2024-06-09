import { Injectable } from '@nestjs/common';
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

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
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
    const type = 'jpg';
    const cam_id = (camera_id) ? camera_id : 'main';

    const thumb_w = 142;
    const thumb_h = 100;
    const thumb_q = 93;
    const thumb_obj = {
      width: thumb_w,
      height: thumb_h,
      quality: thumb_q 
    }
    
    const newImage = {
      height: 480,
      width: 640,
      quality: 100,
      thumb: JSON.stringify(thumb_obj),
      path: '',
    };

    // pre create to get id
    const image = await this.imageRepository.create(newImage);
    // then create the name and path
    const filename = `${image.id}.${type}`;
    const path = `images/${cam_id}/`;
    const uri = path + filename;

    libcamera.still({
      output: path, // output file path
      quality: newImage.quality,
      timeout: 1000, // timeout before taking the picture
      width: newImage.width, // image width
      height: newImage.height, // image height
      thumb: newImage.thumb
    })

    newImage.path = path;

    return {
      image_id: image?.id,
      camera_id: camera_id,
      path: newImage.path,
      filename: filename,
      uri: uri,
      width: newImage.width,
      height: newImage.height,
      quality: newImage.quality,
      thumbnail: newImage.thumb 
    }
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
