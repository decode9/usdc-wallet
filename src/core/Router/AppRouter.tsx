import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../../views';

export default () => {
	return (
		<Router>
			<Switch>
				<Route path='/'>
					<Login />
				</Route>
			</Switch>
		</Router>
	);
};
