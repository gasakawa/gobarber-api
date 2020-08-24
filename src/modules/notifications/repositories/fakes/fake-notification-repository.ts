import ICreateNotificationDTO from '@modules/notifications/dtos/icreate-notification-dto';
import INotificationsRepository from '@modules/notifications/repositories/inotifications-repository';
import Notification from '@modules/notifications/infra/typeorm/schemas/notification';
import { ObjectID } from 'mongodb';

export default class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}
