import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificationDTO from '@modules/notifications/dtos/icreate-notification-dto';
import INotificationsRepository from '@modules/notifications/repositories/inotifications-repository';
import Notification from '../schemas/notification';

export default class NotificationsRepository implements INotificationsRepository {
  private readonly ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });
    await this.ormRepository.save(notification);

    return notification;
  }
}
