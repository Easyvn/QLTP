import DomainMapper from "../../domain/mappers/domain.mapper";
import { Evidence, EvidenceDocument, EvidenceResultType, EvidenceType, EvidenceReport } from "../../domain/models/evidences.model";
import { EvidenceDocumentEntity, EvidenceEntity, EvidenceResultTypeEntity, EvidenceSearchEntity, EvidenceTypeEntity, EvidenceReportEntity } from "../entities/evidences.entity";

class EvidenceMapper extends DomainMapper<Evidence, EvidenceEntity>{
    toDomain(entity: EvidenceEntity): Evidence {
        return new Evidence(
            entity.id,
            entity.evidence_type_id,
            entity.case_id,
            entity.quantity,
            entity.species,
            entity.symbol,
            entity.characteristics,
            entity.result_id,
            entity.result_detail,
            entity.notes,
        )
    }
    fromDomain(domain: Evidence): EvidenceEntity {
        return new EvidenceEntity(
            domain.id,
            domain.evidenceTypeId,
            domain.caseId,
            domain.quantity,
            domain.species,
            domain.symbol,
            domain.characteristics,
            domain.resultId,
            domain.resultDetail,
            domain.notes,
        )
    }
}

class EvidenceSearchMapper extends DomainMapper<Evidence, EvidenceSearchEntity>{
    toDomain(entity: EvidenceSearchEntity): Evidence {
        console.log("On mapper",entity);
        
        return new Evidence(
            entity.id,
            entity.evidence_type_id,
            entity.case_id,
            entity.quantity,
            entity.species,
            entity.symbol,
            entity.characteristics,
            entity.result_id,
            entity.result_detail,
            entity.notes,
            entity.tbl_case.name
        )
    }
    fromDomain(domain: Evidence): EvidenceSearchEntity {
        return;
    }
}

class EvidenceReportMapper extends DomainMapper<EvidenceReport, EvidenceReportEntity> {
    toDomain(entity: EvidenceReportEntity): EvidenceReport {
        // console.log("On mapper", entity);
        
        return new EvidenceReport(
            entity.id,
            entity.evidence_type_id,
            entity.case_id,
            entity.quantity,
            entity.species,
            entity.symbol,
            entity.characteristics,
            entity.result_id,
            entity.result_detail,
            entity.notes,
            entity.caseName,
            entity.prosecution_date
        )
    }
    fromDomain(domain: EvidenceReport): EvidenceReportEntity {
        return;
    }
}

class EvidenceResultTypeMapper extends DomainMapper<EvidenceResultType, EvidenceResultTypeEntity>{
    toDomain(entity: EvidenceResultTypeEntity): EvidenceResultType {
        return new EvidenceResultType(
            entity.id,
            entity.name,
            entity.notes
        )
    }
    fromDomain(domain: EvidenceResultType): EvidenceResultTypeEntity {
        return EvidenceResultTypeEntity.fromObj(domain)
    }
}
class EvidenceTypeMapper extends DomainMapper<EvidenceType, EvidenceTypeEntity>{
    toDomain(entity: EvidenceResultType): EvidenceType {
        return new EvidenceType(
            entity.id,
            entity.name,
            entity.notes
        )
    }
    fromDomain(domain: EvidenceType): EvidenceTypeEntity {
        return EvidenceResultTypeEntity.fromObj(domain)
    }

}

class EvidenceDocumentMapper extends DomainMapper<EvidenceDocument, EvidenceDocumentEntity>{
    toDomain(entity: EvidenceDocumentEntity): EvidenceDocument {
        return new EvidenceDocument(
            entity.id,
            entity.evidence_id,
            entity.path,
            entity.file_name,
            entity.file_type,
            entity.file_size,
            entity.notes
        )
    }
    fromDomain(domain: EvidenceDocument): EvidenceDocumentEntity {
        return new EvidenceDocumentEntity(
            domain.id,
            domain.evidenceId,
            domain.path,
            domain.fileName,
            domain.fileType,
            domain.fileSize,
            domain.notes
        )
    }
}

export {
    EvidenceMapper,
    EvidenceTypeMapper,
    EvidenceDocumentMapper,
    EvidenceResultTypeMapper,
    EvidenceSearchMapper,
    EvidenceReportMapper,
}