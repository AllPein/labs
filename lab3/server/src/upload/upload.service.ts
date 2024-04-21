import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class UploadService {
  async handleFileUpload(file: any): Promise<string> {
    const inputPath = `./tmp/${file.originalname}`;
    const outputPath = `./tmp_out/${uuidv4()}.webm`;

    await promisify(fs.writeFile)(inputPath, file.buffer);
    return this.encodeVideo(inputPath, outputPath);
  }

  private encodeVideo(inputPath: string, outputPath: string): Promise<string> {
    const command = `ffmpeg -i ${inputPath} -c:v libvpx-vp9 ${outputPath}`;
    return promisify(exec)(command).then(
      () => `http://localhost:3000/download/${outputPath.split('/').pop()}`,
    );
  }
}
