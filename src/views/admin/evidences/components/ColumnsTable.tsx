import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, IconButton } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { TableInstance, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import { Icon, Link, useDisclosure, Button } from '@chakra-ui/react';
import { MdOutlineAdd } from 'react-icons/md';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

import AddModal from './AddModal';
import ConfirmDeleteModal from './ConfirmDeleteModel';
import { Evidence } from 'core/domain/models/evidences.model';
import UpdateEvidenceModal from './UpdateEvidenceModal';
import { EvidenceDto } from '../dto/evidence_ui.dto';
import { delay } from 'core/domain/utils/delay.utils';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

export default function ColumnsTable(props: {
	columnsData: any,
	tableData: any,
	caseName: string,
	caseId: string,
	tableInstance: TableInstance<any>,
	onRereshData: () => void,
}) {
	const { columnsData, tableData, caseName, caseId, onRereshData, tableInstance } = props;

	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
	initialState.pageSize = 5;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const brandColor = useColorModeValue('brand.500', 'white');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const updateModelState = useDisclosure();
	const deleteModelState = useDisclosure();

	const [currentEvidence, setCurrentEvidence] = useState<Evidence>()
	const history = useHistory();

	const onClickAddCases = () => {
		onOpen();
	}

	const onDeleteEvidence = async (evidence: Evidence) => {
		deleteModelState.onOpen()
	}

	function onUpdateEvidence(dto: any) {
		setCurrentEvidence(dto.toEvidence());
		updateModelState.onOpen();
	}


	function onNavBack() {
		history.goBack();
	}



	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<AddModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				caseId={caseId}
				onRefreshData={onRereshData}
			/>
			<UpdateEvidenceModal
				evidence={currentEvidence}
				isOpen={updateModelState.isOpen}
				onOpen={updateModelState.onOpen}
				onClose={updateModelState.onClose}
				onDeleteEvidence={onDeleteEvidence}
				onRefreshData={onRereshData}
			/>
			<ConfirmDeleteModal
				evidence={currentEvidence}
				isOpen={deleteModelState.isOpen}
				onOpen={deleteModelState.onOpen}
				onClose={deleteModelState.onClose}
				message="Xác nhận xoá vật chứng này?"
				onRefreshData={onRereshData}
			/>
			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Icon as={IoIosArrowBack} w='20px' h='20px' color={brandColor} onClick={onNavBack} />

				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' style={{ width: '100%', marginLeft: '10px' }}>
					Vật chứng {caseName}
				</Text>
				{/* <Menu /> */}
				<IconButton
					colorScheme="brand"
					aria-label="Search database"
					borderRadius="10px"
					icon={<Icon as={MdOutlineAdd} width='25px' height='25px' color='inherit' />}
					onClick={onClickAddCases}
				/>
			</Flex>
			<Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
				<Thead>
					{headerGroups.map((headerGroup, index) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<Th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									pe='10px'
									key={index}
									borderColor={borderColor}>
									<Flex
										justify='space-between'
										//align='center'
										fontSize={{ sm: '10px', lg: '12px' }}
										style={{ justifyContent: 'center' }}
										color='gray.400'
									>
										{column.render('Header')}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()} key={index} >
								{row.cells.map((cell, index) => {
									let data;
									if (cell.column.id === 'evidenceType') {
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center' }}>

											<Button variant="transparent" onClick={() => onUpdateEvidence(row.original)} >
												<Text color="brand.500" fontSize='sm' fontWeight='700'>
													{cell.value.name}
												</Text>
												</Button>
											</Flex>
										);
									}
									// else if (cell.column.id === 'quantity') {
									// 	data = (
									// 		<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
									// 			<Link color="brand.500" >
									// 				<Text fontSize='sm' fontWeight='700'>
									// 					{cell.value}
									// 				</Text>
									// 			</Link>
									// 		</Flex>
									// 	);
									// }
									else if (cell.column.id === 'document') {
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Link color="brand.500" href={"#/admin/documents/" + row.original.id + "/" + caseName}>
													<Text fontSize='sm' fontWeight='700'>
														Chi tiết
													</Text>
												</Link>
											</Flex>
										);
									}
									else if (cell.column.id === 'result') {
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center' }}>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value.name}
												</Text>
											</Flex>
										);
									}
									else if(cell.column.id !== 'resultDetail'){
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											</Flex>
										);
									}
									else{
										data = (<></>)
									}
									return (
										<Td
											{...cell.getCellProps()}
											key={index}
											fontSize={{ sm: '14px' }}
											minW={{ sm: '150px', md: '200px', lg: 'auto' }}
											borderColor='transparent'>
											{data}
										</Td>
									);
								})}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Card>
	);
}
