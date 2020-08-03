import React from 'react';
import { Router } from '@reach/router';
import './styles.scss';
import Dashboard from '../Dashboard';

const Home = ({ auth }: any) => {
	return (
		<>
			<Router>
        <Dashboard path="/" default/>
      </Router>
		</>
	);
};

export default Home;
