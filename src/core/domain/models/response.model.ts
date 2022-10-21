import { Status } from "./status.model";

export class IResponse<T>{
    data?: T;
    status: Status
    constructor(data: T, status: Status) {
        this.data = data;
        this.status = status
    }
}