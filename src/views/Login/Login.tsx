import React, { useEffect } from 'react';
import Logo from '../../assets/img/tcw-logo-white.png';
import styles from './styles.module.scss';
import { verifyUser } from '../../store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTables } from '../../utils/sqlite/crud';

const Login = ({ auth, action }: any) => {
	useEffect(() => {
		console.log(auth);
		action.verifyUser();
		createTables()
	});

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginInputs}>
				<img src={Logo} alt='Logo' />
				<input placeholder='Usuario' />
				<input placeholder='Contrasena' type='password' />
				<button>Iniciar Sesion</button>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }: any) => {
	return { auth };
};

const mapDispatchToProps = (dispatch: any) => {
	const actions = {
		verifyUser,
	};

	return { action: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
