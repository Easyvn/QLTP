// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { useCallback } from 'react';
import { DropzoneState } from 'react-dropzone';
// Assets
import { MdUpload } from 'react-icons/md';
import Dropzone from 'views/admin/profile/components/Dropzone';

export default function Upload(props: { used?: number; total?: number;[x: string]: any, dropZoneState: DropzoneState }) {
	const { used, total, dropZoneState, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';



	return (
		<Card {...rest} mb='20px' justifyContent={'center'} alignItems='center' style={{ height: '200px' }}>
			<Dropzone
				// w={{ base: '100%', '2xl': '268px' }}
				// me='36px'
				// maxH={{ base: '60%', lg: '50%', '2xl': '100%' }}
				// minH={{ base: '60%', lg: '50%', '2xl': '100%' }}
				dropZoneState={dropZoneState}
				content={
					<Box>
						<Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
						<Flex justify='center' mx='auto' mb='12px'>
							<Text fontSize='xl' fontWeight='700' color={brandColor}>
								Tải lên tài liệu
							</Text>
						</Flex>
						<Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
							PNG, JPEG, WORD, PDF, EXCEL
						</Text>
					</Box>
				}
			/>
		</Card>
	);
}
