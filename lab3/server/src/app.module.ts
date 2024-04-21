import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, UserModule, UploadModule],
  providers: [PrismaService],
})
export class AppModule {}
