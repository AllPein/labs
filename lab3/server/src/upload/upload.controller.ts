import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any, @Res() res: Response) {
    if (!file)
      throw new HttpException('File is missing', HttpStatus.BAD_REQUEST);

    try {
      const downloadUrl = await this.uploadService.handleFileUpload(file);
      res.status(HttpStatus.OK).json({
        message: 'Video upload and encoding started',
        url: downloadUrl,
      });
    } catch (err) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error processing file' });
    }
  }
}
