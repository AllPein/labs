import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { Response } from 'express';
import { SocketGateway } from './socket.gateaway';

@Controller('video')
export class VideoController {
  constructor(
    private videoService: VideoService,
    private socketGateway: SocketGateway,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async handleFileUpload(@UploadedFile() file: any, @Res() res: Response) {
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
      res.json({ message: 'Video successfully transcoded', url: outputPath });
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
