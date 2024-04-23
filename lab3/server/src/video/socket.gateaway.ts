import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: '*', // Adjust according to your security requirements
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  notifyClients(event: string, data: any) {
    console.log(event);
    this.server.emit(event, data);
  }
}
