/*
 * Copyright (c) 2017 TIBCO Software Inc. All Rights Reserved.
 */

export class ResponseConfirmationModalModel {
    constructor(private _response: boolean, private _opId?: any) {
        // Empty
    }


    get response(): boolean {
        return this._response;
    }

    set response(value: boolean) {
        this._response = value;
    }

    get opId(): any {
        return this._opId;
    }

    set opId(value: any) {
        this._opId = value;
    }
}
