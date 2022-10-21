export class Case {
    caseId: string;
    name: string;
    prosecutionDate: Date; // ngay khoi to
    prosecutionNumber: string;
    result: Result;
    handler: string;
    profileNumber: string;
    isSubmit: boolean;
    notes: string;

    constructor(caseId: string,
        name: string,
        prosecutionDate: Date,
        prosecutionNumber: string,
        result: Result,
        handler: string,
        profileNumber: string,
        isSubmit: boolean,
        notes: string = "") {
        this.caseId = caseId;
        this.name = name;
        this.prosecutionDate = prosecutionDate;
        this.prosecutionNumber = prosecutionNumber;
        this.result = result;
        this.handler = handler;
        this.profileNumber = profileNumber;
        this.isSubmit = isSubmit;
        this.notes = notes
    }


}

export class Result {
    id: string;
    name: string

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}