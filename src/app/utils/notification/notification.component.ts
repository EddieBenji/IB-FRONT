import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from './notification.model';
import { NotificationType } from './notification-type.enum';
import { NotificationService } from './notification.service';
import { slideNotification, closeAllNotifications } from './notification.animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.css' ],
  animations: [
    // this is when having a lot of notifications and the user starts closing them one by one
    slideNotification(),
    // this is when having only ONE notification and the user closes it.
    closeAllNotifications()
  ]
})
export class NotificationComponent implements OnInit {
  @Input()
  notifications: NotificationModel[] = [];

  /**
   * Sets the notificationService for retrieving the notifications to show.
   * @param notificationService
   */
  constructor(private notificationService: NotificationService) {
  }

  /**
   * Start listening when to show the notifications.
   */
  ngOnInit(): void {
    this.notificationService.showNotification.subscribe((notifications: NotificationModel[]) => {
      this.notifications = notifications;
      // Let's close all the notifications after 15 seconds of being created:
      setTimeout(() => {
        this.notifications.forEach(notification => {
          this.closeNotification(notification);
        });
      }, 7000);
    });

  }

  /**
   * When closing the notification, it'll emit a message to the observers with the notification closed.
   * @param notificationClosed: NotificationModel
   */
  closeNotification(notificationClosed: NotificationModel) {
    this.notificationService.onNotificationHandled(notificationClosed);
  }

  /**
   * Checks what kind of notification will be shown. (check html template)
   * @param notification
   * @returns {any}
   */
  checkClass(notification: NotificationModel): string {
    if (notification.type === NotificationType.SUCCESS_MSG) {
      return 'll-msg-success';
    }
    if (notification.type === NotificationType.INFO_MSG) {
      return 'll-msg-info';
    }
    return 'll-msg-error';
  }

  /**
   * Depending on the current type of notification, it'll be the img to show
   * in the screen.
   * @param notification
   * @returns {any}
   */
  checkImg(notification: NotificationModel) {
    if (notification.type === NotificationType.SUCCESS_MSG) {
      return 'success.svg';
    }
    if (notification.type === NotificationType.INFO_MSG) {
      return 'info.svg';
    }
    return 'circle-cross-filled.svg';
  }

}
