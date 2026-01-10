import { CheckStatus } from "../types/check-status.type";

export class AvailabilityCheck<T> {
    entity: T;
    status: CheckStatus;
    additionalData?: any;

    constructor(entity: T, status: CheckStatus = null, additionalData?: any) {
        this.entity = entity;
        this.status = status;
        this.additionalData = additionalData;
    }

    public isSuccessful() {
        return this.status === 'success';
    }
}
