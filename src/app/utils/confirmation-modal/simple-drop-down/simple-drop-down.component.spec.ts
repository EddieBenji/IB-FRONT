import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDropDownComponent } from './simple-drop-down.component';
import { SimpleDropDownEmitter } from './simple-drop-down.emitter';

describe('SimpleDropDownComponent', () => {
    let component: SimpleDropDownComponent;
    let fixture: ComponentFixture<SimpleDropDownComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SimpleDropDownComponent ],
            providers: [ SimpleDropDownEmitter ]
        })
          .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleDropDownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
