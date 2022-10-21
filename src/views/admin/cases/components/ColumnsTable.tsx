import { Flex, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { TableInstance, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import { Button, Icon, Link, useDisclosure } from '@chakra-ui/react';
import { MdOutlineAdd } from 'react-icons/md';

// Custom components
import Card from 'components/card/Card';

import { Case } from 'core/domain/models/case.model';
import AddModal from './AddCasesModal';
import ConfirmDeleteModal from './ConfirmDeleteModel';
import UpdateCaseModal from './UpdateCasesModal';

export default function ColumnsTable(props: { columnsData: any; tableData: any, tableInstance: TableInstance<any>, onRereshData: () => void }) {
	const { columnsData, tableData, onRereshData, tableInstance } = props;

	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
	initialState.pageSize = 20;



	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const updateModelState = useDisclosure();
	const deleteModelState = useDisclosure();

	const [currentCase, setCurrentCase] = useState<Case>()


	const onClickAddCases = () => {
		onOpen();
		// deleteModelState.onOpen();
	}


	const onDeleteCase = (_case: Case) => {
		deleteModelState.onOpen()
	}

	const onUpdateCase = (_caseDto: any) => {
		const _case = _caseDto.toCase()
		setCurrentCase(_case);
		updateModelState.onOpen()

	}

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<AddModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				onRereshData={onRereshData}
			/>

			<UpdateCaseModal
				_case={currentCase}
				isOpen={updateModelState.isOpen}
				onOpen={updateModelState.onOpen}
				onClose={updateModelState.onClose}
				onDeleteCase={onDeleteCase}
				onRereshData={onRereshData}
			/>

			<ConfirmDeleteModal
				_case={currentCase}
				isOpen={deleteModelState.isOpen}
				onOpen={deleteModelState.onOpen}
				onClose={deleteModelState.onClose}
				message="Xác nhận xoá vụ án, tình báo này?"
				onRefreshData={onRereshData}
			/>

			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					Vụ án, tin báo
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
						// console.log(row.original);

						return (
							<Tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									let data;
									if (cell.column.id === 'name') {
										data = (
											<Text 
												onClick={() => {
														onUpdateCase(row.original)
													}
												}
												color="brand.500" fontSize='sm' fontWeight='700'>
												{cell.value}
											</Text>
											// <Button variant="transparent" onClick={() => {
											// 	onUpdateCase(row.original)
											// }}>
											// 	<Text color="brand.500" fontSize='sm' fontWeight='700'>
											// 		{cell.value}
											// 	</Text>
											// </Button>
										);
									}
									else if (cell.column.id === 'evidences') {
										data = (
											<Flex style={{ justifyContent: 'center', alignItems: 'center', }}>
												<Link color="brand.500" href={"#/admin/evidences/" + row.original.caseId+"/"+row.original.name}>
													<Text fontSize='sm' fontWeight='700'>
														{cell.value}
													</Text>
												</Link>
											</Flex>
										);
									}
									else {
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
