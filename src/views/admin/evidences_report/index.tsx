import './index.css';

import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Chakra imports
import { Box, Flex, useColorModeValue, Button, Checkbox, Text, Select, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import ColumnsTable from "views/admin/evidences_report/components/ColumnsTable";
import {
  columnsDataColumns
} from "views/admin/evidences_report/variables/columnsData";

// import { SearchBar } from 'views/admin/evidences_report/components/searchBar/SearchBar';
import { LLOG } from 'core/domain/utils/log.utils';
import Pagination from 'react-bootstrap/Pagination';
import { useParams } from 'react-router-dom';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import BeatLoader from "react-spinners/BeatLoader";

import { useEvidenceResults } from 'contexts/evidence_result.context';
import { useEvidenceTypes } from 'contexts/evidence_type.context';
import { AppModule } from 'core/di/app.module';
import { EvidenceRepository } from 'core/domain/repositories/evidences.repository';
import { EVIDENCE_REPOSITORY } from 'core/domain/repositories/master.repository';

import { EvidenceDto } from './dto/evidence_ui.dto';

const evidenceRepo: EvidenceRepository = AppModule.getInstance().provideRepository(EVIDENCE_REPOSITORY);

// var _TOTAL: number = 0;

const Evidences = () => {
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

  const [isLoading, setIsLoading] = React.useState(false);
  // const [keyword, setKeyword] = React.useState("");
  const [total, setTotal] = React.useState(0);

  const [checkboxSpecies, setCheckboxSpecies] = React.useState(true);
  const [checkboxSymbol, setCheckboxSymbol] = React.useState(true);
  const [checkboxCharacteristics, setCheckboxCharacteristics] = React.useState(true);

  // useEffect(() => {
  //   setTotal(0);
  // }, []);

  function getReportEvidences(evidenceTypeId?: string, evidenceResultId?: string, fromDate?: string, toDate?: string) {
    
    // _TOTAL = 0;
    setTotal(0);
    // console.log('evidenceTypeId', evidenceTypeId);
    evidenceRepo.getReportEvidences(`${fromDate} 00:00:00`, `${toDate} 23:59:59`, evidenceResultId ? evidenceResultId : '', evidenceTypeId ? evidenceTypeId : '' , {
      onFailure(code, message) {
        alert(message)
        setIsLoading(false);
      },
      onSuccess(data) {
        // console.log('data', data);
        const evis = data.map(ele => {
          // _TOTAL = _TOTAL + ele.quantity;
          setTotal(total + ele.quantity);
          return EvidenceDto.fromEvidence(ele, evidenceTypes, evidenceResults);
        })
        // LLOG.d(JSON.stringify(evis));
        setEvidences(evis);
        setIsLoading(false);
      },
    })
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Options
        getReportEvidences={getReportEvidences}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        // keyword={keyword}
        // setKeyword={setKeyword}
        checkboxSymbol={checkboxSymbol} 
        setCheckboxSymbol={setCheckboxSymbol}
        checkboxSpecies={checkboxSpecies} 
        setCheckboxSpecies={setCheckboxSpecies}
        checkboxCharacteristics={checkboxCharacteristics}
        setCheckboxCharacteristics={setCheckboxCharacteristics}
        total={total}
      />
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={evidences}
        caseName={caseName}
        caseId={id}
        tableInstance={tableInstance}
        onRereshData={getReportEvidences}
        // isLoading={isLoading}
      />
      {/* <Pagination className="mt-4" style={{ justifyContent: 'center' }}>
        <Pagination.Prev onClick={previousPage} />

        <Pagination.Next onClick={nextPage} />
      </Pagination> */}

    </Box>
  );
}

const Options = (props: { 
  // keyword: string, 
  // setKeyword: Function, 
  getReportEvidences: Function, 
  isLoading: boolean, setIsLoading: Function,
  checkboxSymbol: boolean, setCheckboxSymbol: Function,
  checkboxSpecies: boolean, setCheckboxSpecies: Function,
  checkboxCharacteristics: boolean, setCheckboxCharacteristics: Function,
  total: number,
}) => {

  const { evidenceResults } = useEvidenceResults();
  const { evidenceTypes } = useEvidenceTypes();

  const [evidenceTypeId, setEvidenceTypeId] = useState('');
  const [evidenceResultId, setEvidenceResultId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const { 
    getReportEvidences, 
    isLoading, setIsLoading, 
    //keyword, setKeyword,
    checkboxSymbol, setCheckboxSymbol,
    checkboxSpecies, setCheckboxSpecies,
    checkboxCharacteristics, setCheckboxCharacteristics,
    total,
  } = props;

  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const onSearch = () => {

    if (!fromDate || fromDate == '') {
      alert('Vui lòng nhập "Từ ngày"');
      return;
    }

    if (!toDate || toDate == '') {
      alert('Vui lòng nhập "Đến ngày"');
      return;
    }

    setIsLoading(true);
    getReportEvidences(evidenceTypeId, evidenceResultId, fromDate, toDate);
  }

  return (
    <>
      <Box
        w={{ sm: '100%', md: 'auto' }}
        bg={menuBg}
        //flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
        p='30px'
        mb="20px"
        borderRadius='30px'
        boxShadow={shadow}
      >

        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' style={{ width: '100%', marginLeft: '10px', marginBottom: '20px' }}>
        {/* Thống kê vật chứng {_TOTAL > 0 ? ` | Tổng: ${_TOTAL}` : '' } */}
        Thống kê vật chứng {total > 0 ? ` | Tổng: ${total}` : '' }
				</Text>
        <Row>
          <Col>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Từ ngày<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='date'
              lang='vi-VI'
              placeholder='Nhập ngày khởi tố / tiếp nhận'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={fromDate}
              onChange={(value) => {
                let date = value.target.value;
                // console.log('date', date);
                setFromDate(date);
              }}
              isDisabled={isLoading}
            />
          </Col>
          <Col>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Đến ngày<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='date'
              lang='vi-VI'
              placeholder='Nhập ngày khởi tố / tiếp nhận'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={toDate}
              onChange={(value) => {
                let date = value.target.value;
                // console.log('date', date);
                setToDate(date)
              }}
              isDisabled={isLoading}
            />
          </Col>
        </Row>
        <Row>
            <Col>
              <Select 
                mb='24px' 
                placeholder="Chọn loại vật chứng" 
                style={{ height: '50px', borderRadius: '15px' }}
                onChange={
                (value) => {
                  LLOG.d("On selected", value.target.value);
                  setEvidenceTypeId(value.target.value)
                }
              }>
                {
                  evidenceTypes.map((ele, index) => <option key={index} value={ele.id}
                  >{ele.name}</option>)
                }
              </Select>
            </Col>
            <Col>
              <Select 
                mb='24px' 
                style={{ height: '50px', borderRadius: '15px' }}
                placeholder="Chọn kết quả" onChange={
                (value) => {
                  LLOG.d("On selected", value.target.value);
                  setEvidenceResultId(value.target.value)
                }
              }>
                {
                  evidenceResults.map((ele, index) => <option key={index} value={ele.id}
                  >{ele.name}</option>)
                }
              </Select>
            </Col>
        </Row>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: '20px',
          }}
        >
          <Button
            isLoading={isLoading}
            spinner={<BeatLoader size={8} color="white" />}
            onClick={onSearch}
            fontWeight={'medium'} fontSize={15} variant="brand" 
            //style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
          >
            Tìm kiếm
          </Button>
        </div>
        
      </Box>
    </>
  )
}

export default Evidences;