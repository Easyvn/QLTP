import { Evidence, EvidenceDocument, EvidenceResultType, EvidenceType,EvidenceReport } from "../models/evidences.model";
import { Status } from "../models/status.model";
import { StateCallback } from "../utils/state.callback.utils";
import { CRUDRepository } from "./master.repository";

interface EvidenceTypeRepository extends CRUDRepository<EvidenceType> { }

interface EvidenceResultTypeRepository extends CRUDRepository<EvidenceResultType> { }

interface EvidenceRepository extends CRUDRepository<Evidence> {
    getAllEvidenceByCase(caseId: string, callback: StateCallback<Evidence[], Status>): any
    getAllEvidenceByKeyword(keyword: string, species: boolean, symbol: boolean, characteristics: boolean, callback: StateCallback<Evidence[], Status>) : any
    getReportEvidences(fromDate: string, toDate: string, resutId: string, typeId: string, callback: StateCallback<EvidenceReport[], Status>) : any
}

interface EvidenceDocumentRepository extends CRUDRepository<EvidenceDocument> {
    uploadFile(model: EvidenceDocument, fileList: File[], formData: any, onProgress: (progress: number) => any, callback: StateCallback<EvidenceDocument, Status>): any
    getDocsByEvidence(evidenceId: string, callback: StateCallback<EvidenceDocument[], Status>): any
}


export type {
    EvidenceTypeRepository,
    EvidenceResultTypeRepository,
    EvidenceRepository,
    EvidenceDocumentRepository
};
