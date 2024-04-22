import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from './socket.gateaway';

@Module({
  controllers: [VideoController],
  providers: [VideoService, PrismaService, SocketGateway],
})
export class VideoModule {}
