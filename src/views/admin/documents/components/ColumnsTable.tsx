import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, IconButton } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { TableInstance, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import { Icon, Link, useDisclosure, Button } from '@chakra-ui/react';
import { MdDelete, MdOutlineAdd } from 'react-icons/md';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

import AddModal from './AddModal';
import UpdateCaseModal from './UpdateCasesModal';
import { Case } from 'core/domain/models/case.model';
import ConfirmDeleteModal from './ConfirmDeleteModel';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import { AppModule } from 'core/di/app.module';
import { EvidenceDocumentRepository } from 'core/domain/repositories/evidences.repository';
import { EVIDENCE_DOCS_REPOSITORY } from 'core/domain/repositories/master.repository';
import { EvidenceDocument } from 'core/domain/models/evidences.model';
import { rootUrl } from 'core/data/source/remote.api';
import FileSaver from 'file-saver';
import { bytesToSize } from 'core/domain/utils/storage.utls';
import { delay } from 'core/domain/utils/delay.utils';

export default function ColumnsTable(props: {
	columnsData: any,
	tableData: any,
	caseName: string,
	evidenceId: string,
	tableInstance: TableInstance<any>,
	onRereshData: () => void,
}) {
	const { columnsData, tableData, tableInstance, caseName, onRereshData } = props;
	const location = useLocation()

	// const tableInstance = useTable(
	// 	{
	// 		columns,
	// 		data
	// 	},
	// 	useGlobalFilter,
	// 	useSortBy,
	// 	usePagination
	// );

	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
	initialState.pageSize = 5;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const brandColor = useColorModeValue('brand.500', 'white');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const updateModelState = useDisclosure();
	const deleteModelState = useDisclosure();
	const [currentDocument, setCurrentDocument] = useState<EvidenceDocument>()
	const history = useHistory();
	const [isDownloading, setDownloading] = useState('');


	const onClickAddCases = () => {
		onOpen();
	}

	const onDeleteDocs = (document: any) => {
		setCurrentDocument(document);
		deleteModelState.onOpen();
	}



	function onNavBack() {
		history.goBack();
	}
	async function handleSaveFile(fileId: string, fileUrl: string, fileName: string) {
		setDownloading(fileId)
		FileSaver.saveAs(fileUrl,fileName);
		await delay(500);
		setDownloading('')
	}


	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<AddModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
			/>
			{/* <UpdateCaseModal
				_case={currentCase}
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				onDeleteCase={onDeleteCase}
			/> */}
			<ConfirmDeleteModal
				document={currentDocument}
				isOpen={deleteModelState.isOpen}
				onOpen={deleteModelState.onOpen}
				onClose={deleteModelState.onClose}
				message="Xác nhận xoá tài liệu này?"
				onRefreshData={onRereshData}
			/>
			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Icon as={IoIosArrowBack} w='20px' h='20px' color={brandColor} onClick={onNavBack} />

				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' style={{ width: '100%', marginLeft: '10px' }}>
					Tài liệu vật chứng {caseName}
				</Text>
				{/* <Menu /> */}
				{/* <IconButton
					colorScheme="brand"
					aria-label="Search database"
					borderRadius="10px"
					icon={<Icon as={MdOutlineAdd} width='25px' height='25px' color='inherit' />}
					onClick={onClickAddCases}
				/> */}
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
										color='gray.400'
										style={{ justifyContent: 'center'}}
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
							<Tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									let data;
									// console.log('cell', cell.value);
									if (cell.column.id === 'fileName') {
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											</Flex>
										);
									}
									else if (cell.column.id === 'path') {
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Link color="brand.500" target="_blank" rel="noopener noreferrer" download onClick={() => handleSaveFile(row.original.id, rootUrl + "/" + cell.value, row.original.fileName)}>
													<Text fontSize='sm' fontWeight='700'>
														{isDownloading===row.original.id?"Chuẩn bị tải...":"Tải về"}
													</Text>
												</Link>
											</Flex>
										);
									}
									else if (cell.column.id === 'action') {
										data = (

											<Button variant="transparent" colorScheme={'red'} onClick={() => onDeleteDocs(row.original)}>
												<Icon as={MdDelete} h='18px' w='18px' />

											</Button>
										);
									}
									else if(cell.column.id === 'fileSize'){
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{bytesToSize(cell.value)}
												</Text>

											</Flex>
										);
									}
									else{
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>

											</Flex>
										);
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
