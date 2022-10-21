import { EvidenceResultType } from "core/domain/models/evidences.model";
import { createContext, ReactNode, useContext, useState } from "react";


type EvidenceResultsContextValue = {
    evidenceResults: EvidenceResultType[],
    refreshEvidenceResults: (evidenceResults: EvidenceResultType[]) => void,
    createEvidenceResults: (type: EvidenceResultType) => void,
    updateEvidenceResults: (type: EvidenceResultType) => void,
    deleteEvidenceResultType: (EvidenceResultTypeid: string) => void
}

const EvidenceResultsContext = createContext({} as EvidenceResultsContextValue);


export function useEvidenceResults() {
    return useContext(EvidenceResultsContext);
}


export function EvidenceResultsProvider({
    children
}: { children: ReactNode }) {

    const [evidenceResults, setEvidenceResults] = useState<EvidenceResultType[]>([]);

    function refreshEvidenceResults(EvidenceResults: EvidenceResultType[]) {
        setEvidenceResults(EvidenceResults)
    }

    function createEvidenceResults(type: EvidenceResultType) {
        setEvidenceResults(EvidenceResultTypeList => [type, ...EvidenceResultTypeList])
    }

    function updateEvidenceResults(type: EvidenceResultType) {

    }

    function deleteEvidenceResultType(id: string) {
        setEvidenceResults(EvidenceResultTypeList => EvidenceResultTypeList.filter((type) => type.id !== id))
    }


    return (
        <EvidenceResultsContext.Provider value={{
            evidenceResults,
            refreshEvidenceResults,
            createEvidenceResults,
            updateEvidenceResults,
            deleteEvidenceResultType
        }}>
            {children}
        </EvidenceResultsContext.Provider>
    )
}