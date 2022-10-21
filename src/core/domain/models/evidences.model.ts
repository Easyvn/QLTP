import { runInThisContext } from "vm";

class Evidence {
    id: string;
    evidenceTypeId: string;
    caseId: string;
    quantity: number; // so luong
    species: string; // chung loai
    symbol: string; // ky hieu
    characteristics: string; // dac diem
    resultId: string;
    resultDetail: string;
    notes: string;
    caseName: string;

    constructor(id: string,
        evidenceTypeId: string,
        caseId: string,
        quantity: number,
        species: string,
        symbol: string,
        characteristics: string,
        resultId: string,
        resultDetail: string,
        notes: string = "", caseName?: string) {
        this.id = id;
        this.evidenceTypeId = evidenceTypeId;
        this.caseId = caseId;
        this.quantity = quantity;
        this.species = species;
        this.symbol = symbol;
        this.characteristics = characteristics;
        this.resultId = resultId;
        this.resultDetail = resultDetail;
        this.notes = notes
        this.caseName = caseName;
    }
}

class EvidenceReport extends Evidence {

    prosecution_date: string;

    constructor(id: string,
        evidenceTypeId: string,
        caseId: string,
        quantity: number,
        species: string,
        symbol: string,
        characteristics: string,
        resultId: string,
        resultDetail: string,
        notes: string = "", 
        caseName?: string,
        prosecution_date?: string
    ) {
        super(id, evidenceTypeId, caseId, quantity, species, symbol, characteristics, resultId, resultDetail, notes, caseName);
        this.prosecution_date = prosecution_date;
    }
}

class EvidenceType {
    id: string;
    name: string;
    notes: string;

    constructor(id: string, name: string, notes: string) {
        this.id = id
        this.name = name;
        this.notes = notes;
    }
}

class EvidenceResultType {
    id: string;
    name: string;
    notes: string;

    constructor(id: string, name: string, notes: string) {
        this.id = id
        this.name = name;
        this.notes = notes;
    }
}

class EvidenceDocument {
    id: string
    evidenceId: string
    fileName: string
    fileType: string
    fileSize: string
    notes: string
    path: string

    constructor(
        id: string,
        evidenceId: string,
        path: string,
        fileName: string,
        fileType: string,
        fileSize: string,
        notes: string
    ) {
        this.id = id
        this.evidenceId = evidenceId
        this.path = path
        this.fileName = fileName
        this.fileType = fileType
        this.fileSize = fileSize
        this.notes = notes
    }

}

export {
    Evidence,
    EvidenceResultType,
    EvidenceDocument,
    EvidenceType,
    EvidenceReport
}