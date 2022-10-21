import { Evidence, EvidenceResultType, EvidenceType } from "core/domain/models/evidences.model";

export class EvidenceDto {
    id: string;
    evidenceType: EvidenceType;
    caseId: string;
    quantity: number; // so luong
    species: string; // chung loai
    symbol: string; // ky hieu
    characteristics: string; // dac diem
    result: EvidenceResultType;
    resultDetail: string;
    notes: string;

    constructor(id: string,
        evidenceType: EvidenceType,
        caseId: string,
        quantity: number,
        species: string,
        symbol: string,
        characteristics: string,
        result: EvidenceResultType,
        resultDetail: string,
        notes: string = "") {
        this.id = id;
        this.evidenceType = evidenceType;
        this.caseId = caseId;
        this.quantity = quantity;
        this.species = species;
        this.symbol = symbol;
        this.characteristics = characteristics;
        this.result = result;
        this.resultDetail = resultDetail;
        this.notes = notes
    }

    toEvidence(): Evidence {
        return new Evidence(
            this.id,
            this.evidenceType.id,
            this.caseId,
            this.quantity,
            this.species,
            this.symbol,
            this.characteristics,
            this.result.id,
            this.resultDetail,
            this.notes
        );
    }

    static fromEvidence(evidence: Evidence, eviTypes: EvidenceType[], results: EvidenceResultType[]): EvidenceDto {
        const type = eviTypes.find((ele) => ele.id == evidence.evidenceTypeId);
        const result = results.find(ele => ele.id == evidence.resultId);

        return new EvidenceDto(
            evidence.id,
            type,
            evidence.caseId,
            evidence.quantity,
            evidence.species,
            evidence.symbol,
            evidence.characteristics,
            result,
            evidence.resultDetail,
            evidence.notes
        )
    }
}