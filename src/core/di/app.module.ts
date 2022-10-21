import { AUTH_REPOSITORY, CASE_REPOSITORY, EVIDENCE_DOCS_REPOSITORY, EVIDENCE_REPOSITORY, EVIDENCE_RESULT_REPOSITORY, EVIDENCE_TYPE_REPOSITORY } from "../domain/repositories/master.repository";
import { RepositoryModule } from "./reposity.module";

export class AppModule {
    private static instance?: AppModule;
    private constructor() { }

    static getInstance(): AppModule {
        if (!this.instance) {
            this.instance = new AppModule()
        }
        return this.instance
    }
    private repositoryModule = new RepositoryModule();

    provideRepository<T extends any>(type: number): T | null {
        switch (type) {
            case AUTH_REPOSITORY:
                return this.repositoryModule.provideAuthRepository() as T
            case CASE_REPOSITORY:
                return this.repositoryModule.provideCasesRepository() as T
            case EVIDENCE_REPOSITORY:
                return this.repositoryModule.provideEvidenceRepository() as T
            case EVIDENCE_RESULT_REPOSITORY:
                return this.repositoryModule.provideEvidenceResultTypeRepository() as T
            case EVIDENCE_DOCS_REPOSITORY:
                return this.repositoryModule.provideEvidenceDocsRepository() as T
            case EVIDENCE_TYPE_REPOSITORY:
                return this.repositoryModule.provideEvidenceTypeRepository() as T
        }
        return null
    }


}