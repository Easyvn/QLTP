import { Status } from "../models/status.model";
import { StateCallback } from "../utils/state.callback.utils";

export abstract class Repository { }


interface CRUDRepository<T> {
    getAll(callback: StateCallback<T[], Status>): any;

    create(model: T, callback: StateCallback<T, Status>): any;

    update(model: T, callback: StateCallback<boolean, Status>): any;

    delete(model: T, callback: StateCallback<boolean, Status>): any
}

const AUTH_REPOSITORY = 1
const CASE_REPOSITORY = 2
const EVIDENCE_REPOSITORY = 3
const EVIDENCE_TYPE_REPOSITORY = 4
const EVIDENCE_RESULT_REPOSITORY = 5
const EVIDENCE_DOCS_REPOSITORY = 6


export {
    AUTH_REPOSITORY,
    CASE_REPOSITORY,
    EVIDENCE_REPOSITORY,
    EVIDENCE_TYPE_REPOSITORY,
    EVIDENCE_RESULT_REPOSITORY,
    EVIDENCE_DOCS_REPOSITORY
};
export type { CRUDRepository };
