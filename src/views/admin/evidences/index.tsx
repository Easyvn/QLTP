import './index.css';

// Chakra imports
import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import ColumnsTable from "views/admin/evidences/components/ColumnsTable";
import {
  columnsDataColumns
} from "views/admin/evidences/variables/columnsData";


import { useEvidenceResults } from 'contexts/evidence_result.context';
import { useEvidenceTypes } from 'contexts/evidence_type.context';
import { AppModule } from 'core/di/app.module';
import { EvidenceRepository } from 'core/domain/repositories/evidences.repository';
import { EVIDENCE_REPOSITORY } from 'core/domain/repositories/master.repository';
import { LLOG } from 'core/domain/utils/log.utils';
import Pagination from 'react-bootstrap/Pagination';
import { useParams } from 'react-router-dom';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { EvidenceDto } from './dto/evidence_ui.dto';

const evidenceRepo: EvidenceRepository = AppModule.getInstance().provideRepository(EVIDENCE_REPOSITORY);

// let active = 2;
// let items: [any] = [null];
// for (let number = 1; number <= 5; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active}>
//       {number}
//     </Pagination.Item>,
//   );
// }

// const PaginationBasic  = () => {
//   return (
//     <div>
//       <Pagination style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>{items}</Pagination>
//     </div>
//   );
// }


export default function Evidences() {
  const [evidences, setEvidences] = useState<Array<EvidenceDto>>([]);
  let { id, caseName } = useParams<any>();
  const { evidenceResults } = useEvidenceResults();
  const { evidenceTypes } = useEvidenceTypes();

  const columns = useMemo<any>(() => columnsDataColumns, [columnsDataColumns]);
  const data = useMemo<any>(() => evidences, [evidences]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

  useEffect(() => {
    getAllEvidences();
  }, []);

  function getAllEvidences() {
    evidenceRepo.getAllEvidenceByCase(id, {
      onFailure(code, message) {
        alert(message)
      },
      onSuccess(data) {
        const evis = data.map(ele => EvidenceDto.fromEvidence(ele, evidenceTypes, evidenceResults))
        LLOG.d(JSON.stringify(evis));
        setEvidences(evis);
      },
    })
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={evidences}
        caseName={caseName}
        caseId={id}
        tableInstance={tableInstance}
        onRereshData={getAllEvidences}
      />
      <Pagination className="mt-4" style={{ justifyContent: 'center' }}>
        <Pagination.Prev onClick={previousPage} />

        <Pagination.Next onClick={nextPage} />
      </Pagination>

    </Box>
  );
}
