import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust according to your security requirements
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  notifyClients(event: string, data: any) {
    this.server.emit(event, data);
  }
}
