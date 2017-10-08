/*
 * Copyright (c) 2017 TIBCO Software Inc. All Rights Reserved.
 */


/*
 * Angular 2 libraries
 */
import { EventEmitter } from '@angular/core';
import { SelectOption } from './simple-option.model';

export class SimpleDropDownEmitter {
    public simpleDropDownEmitter = new EventEmitter<SelectOption>();

    public emitSelectedChoice(selectedOption: SelectOption) {
        this.simpleDropDownEmitter.emit(selectedOption);
    }
}
