import { createContext, ReactNode, useContext, useState } from "react";
import { Case } from "../core/domain/models/case.model";


type CasesContextValue = {
    cases: Case[],
    refreshCases: (cases: Case[]) => void,
    createCases: (_case: Case) => void,
    updateCases: (_case: Case) => void,
    deleteCase: (caseid: string) => void
}

const CasesContext = createContext({} as CasesContextValue);


export function useCases() {
    return useContext(CasesContext);
}


export function CasesProvider({
    children
}: { children: ReactNode }) {

    const [cases, setCases] = useState<Case[]>([]);

    function refreshCases(cases: Case[]) {
        setCases(cases)
    }

    function createCases(_case: Case) {
        setCases(caseList => [_case, ...caseList])
    }

    function updateCases(_case: Case) {

    }

    function deleteCase(caseId: string) {
        setCases(caseList => caseList.filter((_case) => _case.caseId !== caseId))
    }


    return (
        <CasesContext.Provider value={{
            cases,
            refreshCases,
            createCases,
            updateCases,
            deleteCase
        }}>
            {children}
        </CasesContext.Provider>
    )
}