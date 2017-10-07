
import {async, inject, TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {NotificationModel} from './notification.model';
import {NotificationType} from './notification-type.enum';

////////  Tests  /////////////
describe('NotificationService (Queues for showing notifications to the user)', () => {
    // This emulates when providing the service to any component:
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [NotificationService]
        })
            .compileComponents();
    }));

    it('should instantiate notification service when injecting it into any component',
        inject([NotificationService], (service: NotificationService) => {
            expect(service instanceof NotificationService).toBe(true);
        }));

    it('should instantiate notification service with "new"',
        inject([], () => {
            const service = new NotificationService();
            expect(service instanceof NotificationService).toBe(true, 'new service should be ok');
        }));

    it('should add a new notification to the queue',
        inject([NotificationService], (service: NotificationService) => {
            service.addMessageToQueue(new NotificationModel('This is a notification used in the tests'));
            expect(service.notifications.length).toBeGreaterThan(0, 'notifications queue should have at least one notification');
        }));

    it('should keep/delete notifications from the queue',
        inject([NotificationService], (service: NotificationService) => {
            const firstNotification = new NotificationModel('This is a notification used in the tests');
            const secondNotification = new NotificationModel('This is another notification', NotificationType.DANGER_MSG);
            // Add notifications to the queue:
            service.addMessageToQueue(firstNotification);
            service.addMessageToQueue(secondNotification);
            // Checks if first notification still persists in the queue:
            expect(service.notifications).toContain(firstNotification, 'notifications queue should have the first notification');
            // Deletes the first notification and checks if no longer in the queue:
            service.onNotificationHandled(firstNotification);
            expect(service.notifications).not.toContain(firstNotification, 'First notification should not be in the queue anymore');
            // Checks the second notification still persists in the queue:
            expect(service.notifications).toContain(secondNotification, 'Second notification should be in the queue');
        }));
});
