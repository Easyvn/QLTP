import { AuthRepositoryImpl } from "../data/repositories/auth.repository";
import { CaseRepositoryImpl } from "../data/repositories/cases.repository";
import { EvidenceDocumentRepositoryImpl } from "../data/repositories/evidences/document.repository";
import { EvidenceRepositoryImpl } from "../data/repositories/evidences/evidence.repository";
import { EvidenceResultTypeRepositoryImpl } from "../data/repositories/evidences/result_type.repository";
import { EvidenceTypeRepositoryImpl } from "../data/repositories/evidences/type.repository";
import { AuthenticationRepository } from "../domain/repositories/authentication.repository";
import { CaseRepository } from "../domain/repositories/cases.reposioty";
import { EvidenceDocumentRepository, EvidenceRepository, EvidenceResultTypeRepository, EvidenceTypeRepository } from "../domain/repositories/evidences.repository";

export class RepositoryModule {

    provideAuthRepository(): AuthenticationRepository {
        return new AuthRepositoryImpl()
    }
    provideCasesRepository(): CaseRepository {
        return new CaseRepositoryImpl();
    }
    provideEvidenceRepository(): EvidenceRepository {
        return new EvidenceRepositoryImpl()
    }
    provideEvidenceTypeRepository(): EvidenceTypeRepository {
        return new EvidenceTypeRepositoryImpl()
    }
    provideEvidenceResultTypeRepository(): EvidenceResultTypeRepository {
        return new EvidenceResultTypeRepositoryImpl()
    }
    provideEvidenceDocsRepository(): EvidenceDocumentRepository {
        return new EvidenceDocumentRepositoryImpl()
    }

}