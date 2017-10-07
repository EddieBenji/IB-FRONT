import {animate, style, transition, trigger} from '@angular/core';
export function slideNotification() {
    return trigger(
        'openNotification', [
            transition(':enter', [
                style({transform: 'translateY(-80%)'}),
                animate('500ms ease-in-out', style({transform: 'translateY(0)'}))
            ]),
            transition(':leave', [
                style({transform: 'translateY(0)'}),
                animate('500ms ease-in-out', style({transform: 'translateY(-100%)'}))
            ])
        ]
    );
}

export function closeAllNotifications() {
    return trigger(
        'closeNotifications', [
            transition(':leave', [
                style({transform: 'translateY(0)'}),
                animate('500ms ease-in-out', style({transform: 'translateY(-100%)'}))
            ])
        ]
    );
}
