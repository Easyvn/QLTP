import DomainMapper from "../../domain/mappers/domain.mapper";
import { Case, Result } from "../../domain/models/case.model";
import { dateFromString, formatDate } from "../../domain/utils/time.utils";
import { CaseEntity } from "../entities/case.entity";
import { ResultEntity } from "../entities/result.entitity";

export class CasesMapper extends DomainMapper<Case, CaseEntity>{
    toDomain(entity: CaseEntity): Case {
        return new Case(
            entity.id,
            entity.name,
            new Date(entity.prosecution_date),
            entity.prosecution_number,
            new Result("", ""),
            entity.handler,
            entity.profile_number,
            entity.is_submit_profile,
            entity.notes
        );
    }
    fromDomain(domain: Case): CaseEntity {
        return new CaseEntity(
            domain.caseId,
            domain.name,
            String(domain.prosecutionDate),
            domain.prosecutionNumber,
            domain.handler,
            domain.profileNumber,
            domain.isSubmit,
            domain.notes,
            null,
        );
    }

}