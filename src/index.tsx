import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import routes from 'components/navigation/routes';
import { AuthenticationProvider, useAuthentication } from 'contexts/auth/auth.context';
import { EvidenceTypesProvider } from 'contexts/evidence_type.context';
import { EvidenceResultsProvider } from 'contexts/evidence_result.context';
import ForgotPassword from 'views/auth/forgot';

function App() {
	const { isAuthenticated } = useAuthentication()
	return (
		<AuthenticationProvider>
			<EvidenceTypesProvider>
				<EvidenceResultsProvider>
					<Route path={routes.CHANGE_PASSWORD} component={ForgotPassword} />
					<Route path={routes.LOGIN} component={AuthLayout} />
					<Route path={routes.ADMIN} component={AdminLayout} />
					{
						isAuthenticated ?
							<Redirect from='/' to={routes.LOGIN} />
							:
							<Redirect from='/' to={routes.ADMIN} />
					}
				</EvidenceResultsProvider>
			</EvidenceTypesProvider>
		</AuthenticationProvider>
	)
}

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
				<Switch>
					<App />
				</Switch>
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);