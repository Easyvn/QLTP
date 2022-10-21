
import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdHome, MdLock } from 'react-icons/md';
import { IoBriefcase } from 'react-icons/io5';
import { AiTwotoneHome } from 'react-icons/ai';
import { TbReportSearch } from 'react-icons/tb';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Cases from 'views/admin/cases';
import Evidences from 'views/admin/evidences';
import EvidencesSearch from 'views/admin/evidences_search';
import Documents from 'views/admin/documents';
import EvidencesReport from 'views/admin/evidences_report';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import appRoutes from 'components/navigation/routes';

const routes = [
	{
		name: 'Trang chủ',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={AiTwotoneHome} width='20px' height='22px' color='inherit' />,
		component: EvidencesSearch
	},
	{
		name: 'Vụ án, tin báo',
		layout: '/admin',
		icon: <Icon as={IoBriefcase} width='20px' height='20px' color='inherit' />,
		path: appRoutes.CASES,
		component: Cases
	},
	{
		name: 'Tìm kiếm vật chứng',
		layout: '/admin',
		icon: <Icon as={TbReportSearch} width='20px' height='20px' color='inherit' />,
		path: appRoutes.EVIDENCES_SEARCH,
		component: EvidencesSearch
	},
	{
		name: 'Thống kê vật chứng',
		layout: '/admin',
		icon: <Icon as={TbReportSearch} width='20px' height='20px' color='inherit' />,
		path: appRoutes.EVIDENCES_REPORT,
		component: EvidencesReport
	},
	{
		name: 'Vật chứng',
		layout: '/admin',
		icon: <Icon as={IoBriefcase} width='20px' height='20px' color='inherit' />,
		path: appRoutes.EVIDENCES,
		component: Evidences
	},
	{
		name: 'Tài liệu',
		layout: '/admin',
		icon: <Icon as={IoBriefcase} width='20px' height='20px' color='inherit' />,
		path: appRoutes.DOCUMMENTS,
		component: Documents
	},
	{
		name: 'Đăng nhập',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
];

export const displayRouters = routes.filter(route => 
	!route.path.includes(appRoutes.DOCUMMENTS) &&
 	!route.path.includes(appRoutes.EVIDENCES)
);

export default routes;
