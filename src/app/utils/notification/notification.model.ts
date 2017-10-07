
import {NotificationType} from './notification-type.enum';
export class NotificationModel {

    /**
     *
     * @param _title
     * @param _message
     * @param _type -> 1: success, 2: info, 3: warning, 4: danger
     */
    constructor(private _title: string, private _type?: number, private _message?: string) {
        if (!_type) {
            this._type = NotificationType.INFO_MSG;
        }
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
    }
}
