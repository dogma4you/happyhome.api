export declare class SocketService {
    private eventsGateway;
    private userRepository;
    sendNotificationToUser(id: number, notification: object): Promise<void>;
    sendNotificationToAdmin(notification: object): Promise<void>;
    emitUser(event: string, user: number, data: object): Promise<void>;
}
