import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    getClient(id: number): Socket;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage<T>(client: Socket, payload: T): void;
    sendToUserConnectionAproval(client: Socket): void;
    brodcastToAll(msg: string): void;
    sendNotificationToUser(user: number, notification: any): void;
    emitUser(user: number, event: string, data: object): Promise<void>;
}
