import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageDto } from './dto/message.dto';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async createMessage(@Request() req, @Body() body: MessageDto) {
    return this.messageService.createMessage(
      req.user.email,
      body.recieverEmail,
      body.content,
    );
  }

  @Get()
  async getMessages() {
    return this.messageService.getMessages();
  }
}
