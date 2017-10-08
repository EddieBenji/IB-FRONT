/*
 * Copyright (c) 2017 TIBCO Software Inc.
 * All Rights Reserved.
 */

import { SelectOption } from './simple-option.model';
export class Select {
    constructor(public labelText: string, public selectOptions: SelectOption[], public columnSize = 8) {
    }
}
