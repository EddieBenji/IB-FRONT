
import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
import {NotificationComponent} from './notification.component';
import {NotificationService} from './notification.service';
import {NotificationModel} from './notification.model';
import {DebugElement, EventEmitter} from '@angular/core';
import {NotificationType} from './notification-type.enum';
import {By} from '@angular/platform-browser';

describe('NotificationComponent', () => {

    let comp: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let notificationService: any;

    let de: DebugElement;

    // Let's create a double for the service:
    const notificationServiceStub = {
            notifications: [
                new NotificationModel('First notification'),
                new NotificationModel('Second one!', NotificationType.SUCCESS_MSG)
            ],
            showNotification: new EventEmitter<NotificationModel[]>(),
            closeNotification: new EventEmitter<NotificationModel>()
        }
    ;

    // async beforeEach (it'll inline the template and the styles into the component)
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationComponent], // declare the test component
            providers: [
                {provide: ComponentFixtureAutoDetect, useValue: true},
                {provide: NotificationService, useValue: notificationServiceStub},
            ]
        }) // compile template and css, then, initialize the tests
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        comp = fixture.componentInstance; // NotificationComponent test instance

        // notificationService
        notificationService = fixture.debugElement.injector.get(NotificationService);
    });
    // query for the title <h1> by CSS element selector

    it('should be waiting for notifications', () => {
        fixture.detectChanges();
        expect(comp.notifications.length).toBeGreaterThanOrEqual(0, 'Component ready!');
    });

    it('should display a notification after added to the queue.', () => {
        comp.notifications.push(new NotificationModel('notif!'));
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.ll-notification-text-area'));
        // HTMLElement
        const div = de.nativeElement;
        expect(div).not.toBeNull();
    });
});
