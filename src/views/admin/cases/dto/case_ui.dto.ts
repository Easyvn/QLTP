import { Case, Result } from "core/domain/models/case.model";
import { dateFromString, formatDate } from "core/domain/utils/time.utils";

export class CaseDto {
    caseId: string;
    name: string;
    prosecutionDate: string; // ngay khoi to
    prosecutionNumber: string;
    result: string;
    handler: string;
    profileNumber: string;
    isSubmitProfile: string;
    notes: string;
    evidences: string;

    constructor(caseId: string,
        name: string,
        prosecutionDate: string,
        prosecutionNumber: string,
        result: string,
        handler: string,
        profileNumber: string,
        isSubmit: string,
        evidences: string = "Vật chứng",
        notes: string = "") {
        this.caseId = caseId;
        this.name = name;
        this.prosecutionDate = prosecutionDate;
        this.prosecutionNumber = prosecutionNumber;
        this.result = result;
        this.handler = handler;
        this.profileNumber = profileNumber;
        this.isSubmitProfile = isSubmit;
        this.notes = notes
        this.evidences = evidences
    }

    toCase(): Case {
        
        return new Case(
            this.caseId,
            this.name,
            dateFromString(this.prosecutionDate, "/"),
            this.prosecutionNumber,
            new Result('', ''),
            this.handler,
            this.profileNumber,
            this.isSubmitProfile === "Đã nộp" ? true : false

        )
    }

    static fromCase(_case: Case): CaseDto {
        return new CaseDto(
            _case.caseId,
            _case.name,
            formatDate(_case.prosecutionDate, "/"),
            _case.prosecutionNumber,
            _case.result.name,
            _case.handler,
            _case.profileNumber,
            _case.isSubmit ? "Đã nộp" : "Chưa nộp"
        )
    }

}