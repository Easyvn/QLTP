/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	//   Chakra color mode
	let location = useLocation();

	const { routes } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[], 
	) => {
		return routes.map(
			(
				route: RoutesType,
				index: number
			) => {
				// console.log('route.layout', route.layout);
				if (route.layout === '/auth' ) {
					return;
				}
				if (route.layout === '/admin') {
					return <Layout index={index} route={route} activeRoute={activeRoute} />
				}
			}
		);
	};
	//  BRAND
	return <>{createLinks(routes)}</>
}

import Accordion from 'react-bootstrap/Accordion';

const Layout = (props: { index: number, route: RoutesType, activeRoute: Function }) => {

	const { index, route, activeRoute } = props;

	let activeIcon = useColorModeValue('brand.500', 'white');
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	
	let textColor = useColorModeValue('secondaryGray.500', 'white');
	let brandColor = useColorModeValue('brand.500', 'brand.400');
	
	return (
		<NavLink key={index} to={route.layout + route.path}>
			{route.icon ? (
				<Box>
					<HStack
						spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
						py='5px'
						ps='10px'>
						<Flex w='100%' alignItems='center' justifyContent='center'>
							<Box
								style={{ paddingBottom: 4 }}
								color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
								me='18px'
							>
								{route.icon}
							</Box>
							<Text
								me='auto'
								color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
								fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
								{route.name}
							</Text>
						</Flex>
						<Box
							h='36px'
							w='4px'
							bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
							borderRadius='5px'
						/>
					</HStack>
				</Box>
			) : (
				<Box>
					<HStack
						spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
						py='5px'
						ps='10px'>
						<Text
							me='auto'
							color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
							fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
							{route.name}
						</Text>
						<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
					</HStack>
				</Box>
			)}
		</NavLink>
	);
}

export default SidebarLinks;
