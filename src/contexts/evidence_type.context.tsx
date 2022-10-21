import { EvidenceType } from "core/domain/models/evidences.model";
import { createContext, ReactNode, useContext, useState } from "react";


type EvidenceTypesContextValue = {
    evidenceTypes: EvidenceType[],
    refreshEvidenceTypes: (evidenceTypes: EvidenceType[]) => void,
    createEvidenceTypes: (type: EvidenceType) => void,
    updateEvidenceTypes: (type: EvidenceType) => void,
    deleteEvidenceType: (EvidenceTypeid: string) => void
}

const EvidenceTypesContext = createContext({} as EvidenceTypesContextValue);


export function useEvidenceTypes() {
    return useContext(EvidenceTypesContext);
}


export function EvidenceTypesProvider({
    children
}: { children: ReactNode }) {

    const [evidenceTypes, setEvidenceTypes] = useState<EvidenceType[]>([]);

    function refreshEvidenceTypes(evidenceTypes: EvidenceType[]) {
        setEvidenceTypes(evidenceTypes)
    }

    function createEvidenceTypes(type: EvidenceType) {
        setEvidenceTypes(evidenceTypeList => [type, ...evidenceTypeList])
    }

    function updateEvidenceTypes(type: EvidenceType) {

    }

    function deleteEvidenceType(id: string) {
        setEvidenceTypes(EvidenceTypeList => EvidenceTypeList.filter((type) => type.id !== id))
    }


    return (
        <EvidenceTypesContext.Provider value={{
            evidenceTypes,
            refreshEvidenceTypes,
            createEvidenceTypes,
            updateEvidenceTypes,
            deleteEvidenceType
        }}>
            {children}
        </EvidenceTypesContext.Provider>
    )
}