import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { Injectable, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/middleware/socket.auth.middleware';

const socketMap = new Map<number, Socket>();

@Injectable()
@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    public getClient(id: number): Socket {
        return socketMap.get(id);
    }

    public afterInit(server: Server) {}
    @UseGuards(WsJwtGuard)
    public handleConnection(@ConnectedSocket() client: Socket) {
        try {
            const token = client.handshake.headers.authorization?.toString().split(' ')[1];
        if (!token) {
            client.disconnect();
            socketMap.delete(client.data.userId);
            return;
        }

        const decoded: any= jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            client.disconnect();
            socketMap.delete(client.data.userId);
            return;
        }

        client.data.userId = decoded.id;
        const bool = socketMap.has(client.data.userId)
        if (!bool) {
            socketMap.set(client.data.userId, client);
            console.log(`Client with userId ${client.data.userId} connected, ${client.id}`);
        }
        
        } catch (error) {
            console.log(error);
            client.disconnect();     
            socketMap.delete(client.data.userId);
        }
    }

    public handleDisconnect(client: Socket) {
        socketMap.delete(client.data.userId);
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    public handleMessage<T>(client: Socket, payload: T): void {
        console.log(`Received message:  from ${client.id}`);
        client.emit('messageReceived', payload);
        client.broadcast.emit('messageReceived', payload);
        this.sendToUserConnectionAproval(client);
    }

    public sendToUserConnectionAproval(client: Socket): void {
        client.emit('connectionResult', "Connected to server")
    }

    public brodcastToAll(msg: string) {
        this.server.emit('newMessage', msg);
    }

    public sendNotificationToUser(user: number, notification: any) {
        const client = socketMap.get(user);
        client && client.emit('notification', JSON.stringify(notification));
    }

    public async emitUser(user: number, event: string, data: object) {
        const client = socketMap.get(+user);
        client.emit(event, JSON.stringify(data));
    }
}
