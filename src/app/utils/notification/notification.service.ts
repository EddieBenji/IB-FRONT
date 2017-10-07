import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NotificationModel } from './notification.model';
import { NotificationType } from './notification-type.enum';

@Injectable()
export class NotificationService {
  // Notifications:
  notifications: NotificationModel[] = [];

  // Notification observers:
  @Output()
  showNotification = new EventEmitter<NotificationModel[]>();
  @Output()
  closeNotification = new EventEmitter<NotificationModel>();

  constructor() {
    // Empty.
  }

  /**
   * Will add a new notification to the queue of notifications.
   * @param newNotification: NotificationModel
   */
  addMessageToQueue(newNotification: NotificationModel) {
    this.notifications.push(newNotification);
    return this.notifications;
  }

  /**
   * It will emit the message for opening the new notification(s) in the screen.
   * If you want to open the notification you're passing without passing any other notification,
   * then send the notification to open here. In case you want to first add notifications and then open all of them,
   * add the messages first.
   * @param newNotification (optional).
   */
  handleNotification(newNotification?: NotificationModel) {
    if (newNotification) {
      this.addMessageToQueue(newNotification);
    }
    this.showNotification.emit(this.notifications);
    return this.notifications;
  }

  /**
   * Wrapper for showing a notification error. It only needs the message to show.
   * @param {string} msg
   */
  handleErrorNotification(msg: string) {
    this.handleNotification(new NotificationModel(msg, NotificationType.DANGER_MSG, ''));
  }

  /**
   * Wrapper for showing a notification of success. It only needs the message to show.
   * @param {string} msg
   */
  handleSuccessNotification(msg: string) {
    this.handleNotification(new NotificationModel(msg, NotificationType.SUCCESS_MSG, ''));
  }

  /**
   * Wrapper for showing an info notification. It only needs the message to show.
   * @param {string} msg
   */
  handleInfoNotification(msg: string) {
    this.handleNotification(new NotificationModel(msg, NotificationType.INFO_MSG, ''));
  }

  /**
   * It'll send the message for telling the observers which notification has been closed. In addition, deletes
   * the notification closed from the array of notifications.
   * @param notificationClosed
   */
  onNotificationHandled(notificationClosed: NotificationModel) {
    const index = this.notifications.indexOf(notificationClosed);
    if (index !== -1) {
      // Means the itemToDelete is in the array of items, so we just slice that element from the array
      this.notifications.splice(index, 1);
    }
    this.closeNotification.emit(notificationClosed);
  }
}
