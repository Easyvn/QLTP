import { MasterRoutes } from "./routes.master";

class Routes extends MasterRoutes {
    CASES = "/case"
    EVIDENCES = "/evidences/:id/:caseName"
    DOCUMMENTS = "/documents/:id/:evidenceName"
    EVIDENCES_REPORT = "/report/evidences"
    EVIDENCES_SEARCH = "/search/evidences"
}
const appRoutes = new Routes()
export default appRoutes
