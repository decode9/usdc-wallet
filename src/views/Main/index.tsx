import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Login from '../Login';
import Home from '../Home';

const Main = ({ auth }: any) => {
	const { isAuth } = auth;
	return <>{isAuth ? <Home /> : <Login />}</>;
};

const mapStateToProps = ({ auth }: any) => {
	return { auth };
};

export default connect(mapStateToProps)(Main);
