import './index.css';

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/cases/components/DevelopmentTable";
import CheckTable from "views/admin/cases/components/CheckTable";
import ColumnsTable from "views/admin/cases/components/ColumnsTable";
import ComplexTable from "views/admin/cases/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/cases/variables/columnsData";
import tableDataDevelopment from "views/admin/cases/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/cases/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/cases/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/cases/variables/tableDataComplex.json";
import React, { useEffect, useMemo, useState } from "react";

import { AnimationType } from "framer-motion/types/render/utils/types";

import Pagination from 'react-bootstrap/Pagination';
import { CaseRepository } from 'core/domain/repositories/cases.reposioty';
import { AppModule } from 'core/di/app.module';
import { CASE_REPOSITORY } from 'core/domain/repositories/master.repository';
import { CaseDto } from './dto/case_ui.dto';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

const caseRepo: CaseRepository = AppModule.getInstance().provideRepository(CASE_REPOSITORY);

function Paging() {
  return (
    <Pagination className="mt-4" style={{ justifyContent: 'center' }}>
      {/* <Pagination.First /> */}
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      {/* <Pagination.Last /> */}
    </Pagination>
  );
}

export default function Settings() {
  const [cases, setCases] = useState<Array<CaseDto>>([]);

  useEffect(() => {
    getAllCases();
  }, []);

  async function getAllCases() {
    caseRepo.getAll({
      onFailure(code, message) {
        alert(message.message)
      },
      onSuccess(data) {
        const cases = data.map((_case) => CaseDto.fromCase(_case));
        setCases(cases);
      },
    });
  }
  const columns = useMemo<any>(() => columnsDataColumns, [columnsDataColumns]);
  const data = useMemo(() => cases, [cases]);

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
  

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={cases}
        onRereshData={getAllCases}
        tableInstance={tableInstance}
      />
      <Pagination className="mt-4" style={{ justifyContent: 'center' }}>
        <Pagination.Prev onClick={previousPage} />

        <Pagination.Next onClick={nextPage} />
      </Pagination>

    </Box>
  );
}
