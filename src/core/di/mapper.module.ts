import { CasesMapper } from "../data/mappers/cases.mapper";
import { EvidenceDocumentMapper, EvidenceMapper, EvidenceResultTypeMapper, EvidenceSearchMapper, EvidenceTypeMapper, EvidenceReportMapper } from "../data/mappers/evidences.mapper";

export class MapperModule {
    private static instance?: MapperModule;
    private constructor() { }

    static getInstance(): MapperModule {
        if (!this.instance) {
            this.instance = new MapperModule()
        }
        return this.instance
    }

    provideEvidenceTypeMapper(): EvidenceTypeMapper {
        return new EvidenceTypeMapper()
    }

    provideEvidenceSearchMapper(): EvidenceSearchMapper {
        return new EvidenceSearchMapper()
    }

    provideEvidenceReportMapper(): EvidenceReportMapper {
        return new EvidenceReportMapper()
    }

    provideEvidenceResultType(): EvidenceResultTypeMapper {
        return new EvidenceResultTypeMapper()
    }

    provideEvidenceMapper(): EvidenceMapper {
        return new EvidenceMapper()
    }

    provideEvidenceDocumentMapper(): EvidenceDocumentMapper {
        return new EvidenceDocumentMapper()
    }

    provideCaseMapper(): CasesMapper {
        return new CasesMapper()
    }
}