"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const socket_auth_middleware_1 = require("../middleware/socket.auth.middleware");
const socketMap = new Map();
let EventsGateway = class EventsGateway {
    getClient(id) {
        return socketMap.get(id);
    }
    afterInit(server) { }
    handleConnection(client) {
        try {
            const token = client.handshake.headers.authorization?.toString().split(' ')[1];
            if (!token) {
                client.disconnect();
                socketMap.delete(client.data.userId);
                return;
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                client.disconnect();
                socketMap.delete(client.data.userId);
                return;
            }
            client.data.userId = decoded.id;
            const bool = socketMap.has(client.data.userId);
            if (!bool) {
                socketMap.set(client.data.userId, client);
                console.log(`Client with userId ${client.data.userId} connected, ${client.id}`);
            }
        }
        catch (error) {
            console.log(error);
            client.disconnect();
            socketMap.delete(client.data.userId);
        }
    }
    handleDisconnect(client) {
        socketMap.delete(client.data.userId);
        console.log(`Client disconnected: ${client.id}`);
    }
    handleMessage(client, payload) {
        console.log(`Received message:  from ${client.id}`);
        client.emit('messageReceived', payload);
        client.broadcast.emit('messageReceived', payload);
        this.sendToUserConnectionAproval(client);
    }
    sendToUserConnectionAproval(client) {
        client.emit('connectionResult', "Connected to server");
    }
    brodcastToAll(msg) {
        this.server.emit('newMessage', msg);
    }
    sendNotificationToUser(user, notification) {
        const client = socketMap.get(user);
        client && client.emit('notification', JSON.stringify(notification));
    }
    async emitUser(user, event, data) {
        const client = socketMap.get(+user);
        client.emit(event, JSON.stringify(data));
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(socket_auth_middleware_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleMessage", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ cors: true })
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map