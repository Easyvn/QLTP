import './index.css';

import React from 'react';

// Chakra imports
import { Box, Flex, useColorModeValue, Button, Checkbox, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import ColumnsTable from "views/admin/evidences_search/components/ColumnsTable";
import {
  columnsDataColumns
} from "views/admin/evidences_search/variables/columnsData";

import { SearchBar } from 'views/admin/evidences_search/components/searchBar/SearchBar';
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
  const [keyword, setKeyword] = React.useState("");

  const [checkboxSpecies, setCheckboxSpecies] = React.useState(true);
  const [checkboxSymbol, setCheckboxSymbol] = React.useState(true);
  const [checkboxCharacteristics, setCheckboxCharacteristics] = React.useState(true);

  useEffect(() => {
    console.log('useEffect first render');
  }, []);

  function getAllEvidencesBykeyword() {
    evidenceRepo.getAllEvidenceByKeyword(keyword, checkboxSpecies, checkboxSymbol, checkboxCharacteristics, {
      onFailure(code, message) {
        alert(message)
        setIsLoading(false);
      },
      onSuccess(data) {
        console.log('data', data);
        const evis = data.map(ele => {
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
      <Search
        getAllEvidencesBykeyword={getAllEvidencesBykeyword}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        keyword={keyword}
        setKeyword={setKeyword}
        checkboxSymbol={checkboxSymbol} 
        setCheckboxSymbol={setCheckboxSymbol}
        checkboxSpecies={checkboxSpecies} 
        setCheckboxSpecies={setCheckboxSpecies}
        checkboxCharacteristics={checkboxCharacteristics}
        setCheckboxCharacteristics={setCheckboxCharacteristics}
      />
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={evidences}
        caseName={caseName}
        caseId={id}
        tableInstance={tableInstance}
        onRereshData={getAllEvidencesBykeyword}
      />
      <Pagination className="mt-4" style={{ justifyContent: 'center' }}>
        <Pagination.Prev onClick={previousPage} />

        <Pagination.Next onClick={nextPage} />
      </Pagination>

    </Box>
  );
}

const Search = (props: { 
  keyword: string, 
  setKeyword: Function, 
  getAllEvidencesBykeyword: Function, 
  isLoading: boolean, setIsLoading: Function,
  checkboxSymbol: boolean, setCheckboxSymbol: Function,
  checkboxSpecies: boolean, setCheckboxSpecies: Function,
  checkboxCharacteristics: boolean, setCheckboxCharacteristics: Function,

}) => {

  const { 
    getAllEvidencesBykeyword, 
    isLoading, setIsLoading, keyword, setKeyword,
    checkboxSymbol, setCheckboxSymbol,
    checkboxSpecies, setCheckboxSpecies,
    checkboxCharacteristics, setCheckboxCharacteristics
  } = props;

  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const onSearch = () => {

    if (keyword == '') {
      alert("Từ khóa không được để trống");
      return;
    }

    setIsLoading(true);
    getAllEvidencesBykeyword();
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
					Tìm kiếm vật chứng
				</Text>

        <Flex
          alignItems='center'
          flexDirection='row'

        >
          <SearchBar
            isDisabled={isLoading}
            keyword={keyword}
            setKeyword={setKeyword}
            mb={() => {
              // if (secondary) {
              // 	return { base: '10px', md: 'unset' };
              // }
              return 'unset';
            }}
            //me='10px'
            style={{ borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}
          />
          <Button
            isLoading={isLoading}
            spinner={<BeatLoader size={8} color="white" />}
            onClick={onSearch}
            fontWeight={'medium'} fontSize={15} variant="brand" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>Tìm kiếm</Button>
        </Flex>
        <Flex
          mt="20px"
          justifyContent={'center'}
        >
          <>
            <Checkbox
              // defaultChecked={true}
              isChecked={checkboxSpecies}
              onChange={() => {
                setCheckboxSpecies(!checkboxSpecies);
              }}
              colorScheme='brandScheme'
              me='10px'
              id="check1"
            />
            <label  htmlFor="check1" style={{  }}>Chủng loại</label>
          </>
          <>
            <Checkbox
              isChecked={checkboxSymbol}
              onChange={() => {
                setCheckboxSymbol(!checkboxSymbol);
              }}
              colorScheme='brandScheme'
              me='10px'
              ml="20px"
              id="check2"
            />
            <label  htmlFor="check2" style={{ marginRight: '20px' }}>Ký hiệu</label>
          </>
          <>
            <Checkbox
              isChecked={checkboxCharacteristics}
              onChange={() => {
                setCheckboxCharacteristics(!checkboxCharacteristics);
              }}
              colorScheme='brandScheme'
              me='10px'
              id="check3"
            />
            <label  htmlFor="check3" style={{ marginRight: '20px' }}>Đặc điểm</label>
          </>
        </Flex>
        
      </Box>
    </>
  )
}

export default Evidences;