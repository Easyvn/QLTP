// Chakra imports
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { LLOG } from 'core/domain/utils/log.utils';
// Assets
import { DropzoneState, useDropzone } from 'react-dropzone';

function Dropzone(props: { content: JSX.Element | string;[x: string]: any, dropZoneState: DropzoneState }) {
	const { content, dropZoneState, ...rest } = props;
	const { getRootProps, getInputProps } = dropZoneState;
	const bg = useColorModeValue('gray.100', 'navy.700');
	const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
	return (
		<Flex
			align='center'
			justify='center'
			bg={bg}
			border='1px dashed'
			borderColor={borderColor}
			borderRadius='16px'
			w='100%'
			h='max-content'
			minH='100%'
			cursor='pointer'
			{...getRootProps({ className: 'dropzone' })}
			{...rest}
		>
			<input {...getInputProps()} />
			<Button variant='no-effects'>{content}</Button>
		</Flex>
	);
}

export default Dropzone;
