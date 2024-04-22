import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as ffmpeg from 'ffmpeg-static';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}

  async createTask(): Promise<{ id: number; status: string }> {
    return this.prisma.videoTranscodingTask.create({
      data: {
        status: 'pending',
      },
    });
  }

  async transcodeVideo(filePath: string, taskId: number): Promise<string> {
    const outputPath = filePath.replace(/\.\w+$/, '.mp4');
    const command = `${ffmpeg} -i ${filePath} ${outputPath}`;

    try {
      await promisify(exec)(command);
      await this.updateTaskStatus(taskId, 'completed');
      return outputPath;
    } catch (error) {
      await this.updateTaskStatus(taskId, 'failed');
      throw new Error('Failed to transcode video.');
    }
  }

  async updateTaskStatus(taskId: number, status: string) {
    return this.prisma.videoTranscodingTask.update({
      where: { id: taskId },
      data: { status },
    });
  }
}
