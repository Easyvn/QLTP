// Chakra imports
import { Flex, useColorModeValue, Text, Stack  } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {

	return (
		<Flex justifyContent = 'center' alignItems='center' flexDirection='column'>
			<Text align="center" fontSize="4xl" fontWeight={'bold'}>CAT Phú Thọ</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
