import { IEntity } from "../../domain/models/entity.model"
import { CaseEntity } from "./case.entity"


class EvidenceEntity implements IEntity {
    id: string
    evidence_type_id: string
    case_id: string
    quantity: number
    species: string
    symbol: string
    characteristics: string
    result_id: string
    result_detail: string
    notes: string
    tbl_case: CaseEntity;

    constructor(
        id: string,
        evidence_type_id: string,
        case_id: string,
        quantity: number,
        species: string,
        symbol: string,
        characteristics: string,
        result_id: string,
        result_detail: string,
        notes: string,
    ) {
        this.id = id;
        this.evidence_type_id = evidence_type_id;
        this.case_id = case_id
        this.quantity = quantity
        this.species = species
        this.symbol = symbol
        this.characteristics = characteristics
        this.result_id = result_id
        this.result_detail = result_detail
        this.notes = notes
    }
    static fromObj(obj: any): EvidenceEntity {
        return new EvidenceEntity(
            obj.id,
            obj.evidence_type_id,
            obj.case_id,
            obj.quantity,
            obj.species,
            obj.symbol,
            obj.characteristics,
            obj.result_id,
            obj.result_detail,
            obj.notes,
        )
    }
}

class EvidenceSearchEntity extends EvidenceEntity{
    tbl_case:CaseEntity;
    constructor(
        tbl_case:CaseEntity,
        id: string,
        evidence_type_id: string,
        case_id: string,
        quantity: number,
        species: string,
        symbol: string,
        characteristics: string,
        result_id: string,
        result_detail: string,
        notes: string,
    ){
        super(id,evidence_type_id,case_id,quantity,species,symbol,characteristics,result_id,result_detail,notes);
        this.tbl_case = tbl_case;
    }
}

class EvidenceReportEntity extends EvidenceEntity {
    caseName: string;
    prosecution_date: string;
    constructor(
        id: string,
        evidence_type_id: string,
        case_id: string,
        quantity: number,
        species: string,
        symbol: string,
        characteristics: string,
        result_id: string,
        result_detail: string,
        notes: string,
        caseName: string,
        prosecution_date: string,
    ){
        super(id,evidence_type_id,case_id,quantity,species,symbol,characteristics,result_id,result_detail,notes);
        this.prosecution_date = prosecution_date;
        this.caseName = caseName;
    }
}

class EvidenceTypeEntity implements IEntity {
    id: string;
    name: string;
    notes: string;

    constructor(id: string, name: string, notes: string) {
        this.id = id
        this.name = name;
        this.notes = notes;
    }


    static fromObj(obj: any) {
        return new EvidenceTypeEntity(
            obj.id,
            obj.name,
            obj.notes
        )
    }
}

class EvidenceResultTypeEntity implements IEntity {
    id: string;
    name: string;
    notes: string;

    constructor(id: string, name: string, notes: string) {
        this.id = id
        this.name = name;
        this.notes = notes;
    }


    static fromObj(obj: any) {
        return new EvidenceTypeEntity(
            obj.id,
            obj.name,
            obj.notes
        )
    }
}

class EvidenceDocumentEntity implements IEntity {
    id: string
    evidence_id: string
    file_name: string
    file_type: string
    file_size: string
    notes: string
    path: string

    constructor(
        id: string,
        evidence_id: string,
        path: string,
        file_name: string,
        file_type: string,
        file_size: string,
        notes: string
    ) {
        this.id = id
        this.evidence_id = evidence_id
        this.file_name = file_name
        this.file_type = file_type
        this.file_size = file_size
        this.notes = notes
    }

    static fromObj(obj: any): EvidenceDocumentEntity {
        return new EvidenceDocumentEntity(
            obj.id,
            obj.evidence_id,
            obj.path,
            obj.file_name,
            obj.file_type,
            obj.file_size,
            obj.notes,
        )
    }
}

export {
    EvidenceEntity,
    EvidenceReportEntity,
    EvidenceResultTypeEntity,
    EvidenceDocumentEntity,
    EvidenceTypeEntity,
    EvidenceSearchEntity
}