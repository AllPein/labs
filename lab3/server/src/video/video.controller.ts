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
import { VideoService } from './video.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SocketGateway } from './socket.gateaway';

@Controller('video')
export class VideoController {
  constructor(
    private videoService: VideoService,
    private socketGateway: SocketGateway,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async handleFileUpload(@UploadedFile() file: any, @Res() res) {
    if (!file)
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);

    const task = await this.videoService.createTask();
    this.socketGateway.notifyClients('status', {
      taskId: task.id,
      status: 'processing',
    });

    try {
      const outputPath = await this.videoService.transcodeVideo(
        file.path,
        task.id,
      );
      this.socketGateway.notifyClients('status', {
        taskId: task.id,
        status: 'completed',
        url: outputPath,
      });
      res.json({
        message: 'Video successfully transcoded',
        url: `/download/${outputPath}`,
      });
    } catch (error) {
      this.socketGateway.notifyClients('status', {
        taskId: task.id,
        status: 'failed',
      });
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Failed to transcode video');
    }
  }
}
