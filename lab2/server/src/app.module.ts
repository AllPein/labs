import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UserModule, MessageModule],
  providers: [PrismaService],
})
export class AppModule {}
