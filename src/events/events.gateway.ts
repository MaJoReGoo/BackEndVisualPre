// backend/src/events/events.gateway.ts
import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import axios from 'axios';

@WebSocketGateway(3001) // Puerto donde se va a escuchar el WebSocket
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  private clients: Set<Socket> = new Set();

  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket Gateway Inicializado');
  }

  // Cuando un cliente se conecta
  handleConnection(client: Socket) {
    console.log('Cliente conectado');
    this.clients.add(client);
  }

  // Cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado');
    this.clients.delete(client);
  }

  // Método que consulta el endpoint externo y envía la información a los clientes
  async fetchAndEmitData() {
    try {
      // Consumimos un endpoint externo (reemplaza con tu URL real)
      const response = await axios.get('https://api.externa.com/datos'); 
      const newData = response.data;

      // Emitimos los datos a todos los clientes conectados
      this.clients.forEach(client => {
        client.emit('newData', newData);
      });
      
      console.log('Datos enviados a los clientes');
    } catch (error) {
      console.error('Error al obtener datos del endpoint externo:', error);
    }
  }

  // Para emitir mensajes en tiempo real, puedes usar este método
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return data;
  }
}
