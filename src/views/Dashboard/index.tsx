import React, { FC } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

const Dashboard: FC<RouteComponentProps> = ({ auth }: any) => {
	const { isAuth } = auth;
	return <div>Hola {isAuth}</div>;
};

const mapStateToProps = ({ auth }: any) => {
	return { auth };
};

export default connect(mapStateToProps)(Dashboard);
