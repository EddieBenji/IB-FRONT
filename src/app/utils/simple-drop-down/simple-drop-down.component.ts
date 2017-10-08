import { Component, Input, OnInit } from '@angular/core';
import { SimpleDropDownEmitter } from './simple-drop-down.emitter';
import { SelectOption } from './simple-option.model';
import { Select } from './simple-select.model';

@Component({
    selector: 'app-simple-drop-down',
    templateUrl: './simple-drop-down.component.html',
    styleUrls: [ './simple-drop-down.component.css' ]
})
export class SimpleDropDownComponent implements OnInit {
    @Input()
    public select: Select = null;

    constructor(private simpleDropDownEmitter: SimpleDropDownEmitter) {
    }

    ngOnInit() {
    }

    isDropDownVisible() {
        return this.select && this.select.selectOptions && this.select.selectOptions.length !== 0;
    }

    selectOption(selectedOptionId) {
        let selected = null;
        this.select.selectOptions.forEach(
          (option: SelectOption) => {
              if (option.id === selectedOptionId) {
                  selected = option;
                  option.isSelected = true;
              } else {
                  option.isSelected = false;
              }
          }
        );
        this.simpleDropDownEmitter.emitSelectedChoice(selected);
    }

    getColumnSizeForLabel() {
        const labelColumnSize = 12 - this.select.columnSize;
        return 'col-sm-' + labelColumnSize + ' col-md-' + labelColumnSize + ' col-lg-' + labelColumnSize;
    }

    getColumnSizeForSelect() {
        return 'col-sm-' + this.select.columnSize + ' col-md-' + this.select.columnSize + ' col-lg-' + this.select.columnSize;
    }

}
