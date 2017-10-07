/**
 * Created by lalo on 13/06/17.
 */

import { animate, state, style, transition, trigger } from '@angular/core';


export function slideModal() {
  return trigger(
    'openModal', [
      transition(':enter', [
        style({ transform: 'translateY(-80%)' }),
        animate('500ms ease-in', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('500ms ease-out', style({ transform: 'translateY(-140%)' }))
      ])
    ]
  );
}
