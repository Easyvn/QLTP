import { Case } from "../models/case.model";
import { Status } from "../models/status.model";
import { StateCallback } from "../utils/state.callback.utils";
import { CRUDRepository } from "./master.repository";


export interface CaseRepository extends CRUDRepository<Case> {
}