import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(email: string, recieverEmail: string, content: string) {
    return this.prisma.message.create({
      data: {
        from: email,
        to: recieverEmail,
        content,
      },
    });
  }

  async getMessages() {
    return this.prisma.message.findMany();
  }
}
