// const rootUrl = "http://123.24.205.87:7777"
// // const rootUrl = "http://localhost:7777"

import rootUrl from "core/data/helper/root.url";

// authentication
const login = "/auth/sign-in"
const refreshToken = "/auth/refresh-token"
const register = "/auth/register"
const changeUserPassword = "/auth/change-user-password"

const cases = "/cases"
// evidences type
const evidencesType = "/evidencen_types"
const evidencesResultType = "/evidence_result_lists"
const evidences = "/evidences"
const evidencesDocument = "/evidence_documents"
const documentsByEvidence = "/evidence_documents/evidence"
const evidencesByCase = "/evidences/getEvidenceByCaseId"
const evidencesSearch = "/evidences/search"
const evidencesReport = "/evidences/report"

export {
    rootUrl,
    login,
    refreshToken,
    register,
    changeUserPassword,
    cases,
    evidencesType,
    evidencesResultType,
    evidences,
    evidencesDocument,
    documentsByEvidence,
    evidencesByCase,
    evidencesSearch,
    evidencesReport,
}