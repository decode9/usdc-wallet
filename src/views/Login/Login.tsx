import React from 'react';
import Logo from '../../assets/img/tcw-logo-white.png';
import styles from './styles.module.scss';

export default () => {
	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginInputs}>
				<img src={Logo} alt='Logo' />
				<input placeholder="Usuario" />
				<input placeholder="Contrasena" />
				<button>Iniciar Sesion</button>
			</div>
		</div>
	);
};
