import { Inject, Injectable } from "@nestjs/common";
import { UserTypeEnum } from "src/constants/enum";
import { EventsGateway } from "src/events/events.gateway";
import { UserRepository } from "src/repository/user.repository";

@Injectable()
export class SocketService {
  @Inject()
  private eventsGateway: EventsGateway;
  @Inject()
  private userRepository: UserRepository;

  public async sendNotificationToUser(id: number, notification: object): Promise<void> {
    this.eventsGateway.sendNotificationToUser(id, notification);
  }

  public async sendNotificationToAdmin(notification: object): Promise<void> {
    const admin = await this.userRepository.getOne({ type: UserTypeEnum.admin});
    this.eventsGateway.sendNotificationToUser(admin.id, notification);
  }

  public async emitUser(event: string, user: number, data: object) {
    this.eventsGateway.emitUser(user, event, data);
  }
}