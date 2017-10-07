/*
 * Copyright (c) 2017 TIBCO Software Inc. All Rights Reserved.
 */
export class ConfirmationModalModel {

    /**
     *
     * @param _header: string. The header to show in the top of the modal.
     * @param _question: string. The question to show in the center of the modal.
     * @param _opId: any. This is an identifier for the operation you're doing. Because this is a generic modal,
     * you may want to keep track what you're asking to the user. Once the modal is close, it'll send back the op id.
     * @param _answers: string[]. By default: ['Yes', 'No']. (The first element should always be the positive answer).
     */
    constructor(private _header: string, private _question: string, private _opId?: any, private _answers?: string[]) {
        if (!this._answers) {
            this._answers = ['Yes', 'No'];
        }
    }


    public get header(): string {
        return this._header;
    }

    public set header(value: string) {
        this._header = value;
    }

    public get question(): string {
        return this._question;
    }

    public set question(value: string) {
        this._question = value;
    }

    /**
     * Returns the first element of the array, which should be Yes, Ok, Confirm or similar.
     * @returns {string}
     */
    public getPositiveAnswer() {
        return this._answers[0];
    }

    /**
     * Returns the last element of the array, which should be No, Cancel, Close or similar.
     * @returns {string}
     */
    public getFalsyAnswer() {
        return this._answers[1];
    }

    /**
     * This attribute helps to track the operation is been asking to the user.
     * @returns {any}
     */
    get opId(): any {
        return this._opId;
    }

    /**
     * This attribute helps to track the operation is been asking to the user.
     * @param value
     */
    set opId(value: any) {
        this._opId = value;
    }
}
