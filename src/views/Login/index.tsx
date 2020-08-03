import React, { useEffect, useState } from 'react';
import Logo from '../../assets/img/tcw-logo-white.png';
import './styles.scss';
import { verifyUser, register, login } from '../../store/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValidation } from '../../utils';

const Login = ({ auth, action }: any) => {
	const [form, setForm]: any = useState({
		username: '',
		password: '',
		confirm_password: '',
	});

	useEffect(() => {
		action.verifyUser();
	}, []); 

	const [validation, setValidation]: any = useState({
		username: false,
		password: false,
		confirm_password: false,
		loginValid: false,
		registerValid: false,
		username_validation: {
			minLength: 4,
			maxLength: 15,
			required: true,
			regex: /[A-Za-z0-9]+/,
		},
		password_validation: {
			minLength: 4,
			maxLength: 20,
			required: true,
			regex: /[A-Za-z0-9]+/,
		},
		confirm_password_validation: {
			minLength: 4,
			maxLength: 20,
			equal: 'password',
			required: true,
			regex: /[A-Za-z0-9]+/,
		},
	});

	const updateForm = (name: string, value: string) => {
		let validationName = `${name}_validation`;
		let validate = formValidation(validation[validationName], value, form);

		for (let val in validation[validationName]) {
			if (val === 'equal') {
				validate = value === form[validation[validationName][val]];
			}
		}

		let newValidate: any = {};
		let loginValid = true;
		let registerValid = true;

		newValidate[name] = validate;

		for (let key in form) {
			if (key !== 'confirm_password')
				loginValid = loginValid && key === name ? validate : validation[key];

			registerValid =
				registerValid && key === name ? validate : validation[key];
		}

		newValidate['loginValid'] = loginValid;
		newValidate['registerValid'] = registerValid;

		let newValue: any = {};
		newValue[name] = value;

		setForm({ ...form, ...newValue });
		setValidation({ ...validation, ...newValidate });
	};

	return (
		<div className='loginContainer'>
			<div className='loginInputs'>
				<img src={Logo} alt='Logo' />

				<input
					placeholder='Usuario'
					value={form.username}
					name='username'
					onChange={(event) =>
						updateForm(event.target.name, event.target.value)
					}
				/>
				{!validation.username && form.username !== '' ? (
					<p className='error'>
						El Usuario es requerido. Minimo 4 Digitos. Maximo 15 Digitos, Solo
						numeros y letras
					</p>
				) : null}
				<input
					placeholder='Contrasena'
					type='password'
					value={form.password}
					name='password'
					onChange={(event) =>
						updateForm(event.target.name, event.target.value)
					}
				/>
				{!validation.password && form.password !== '' ? (
					<p className='error'>
						La contrasena es requerida. Minimo 4 Digitos. Maximo 20 Digitos,
						Solo numeros y letras
					</p>
				) : null}
				{auth.isRegister ? (
					<button
						disabled={!validation.loginValid}
						onClick={() => action.login(form)}
					>
						Iniciar Sesion
					</button>
				) : (
					<div>
						<input
							placeholder='Confirmar Contrasena'
							type='password'
							name='confirm_password'
							value={form.confirm_password}
							onChange={(event) =>
								updateForm(event.target.name, event.target.value)
							}
						/>
						{!validation.confirm_password && form.confirm_password !== '' ? (
							<p className='error'>
								La confirmacion de contrasena es requerida. Debe coincidir con
								la contrasena. Minimo 4 Digitos. Maximo 20 Digitos, Solo numeros
								y letras
							</p>
						) : null}
						<button
							disabled={!validation.registerValid}
							onClick={() => action.register(form)}
						>
							Registrarse
						</button>
					</div>
				)}
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
		register,
		login,
	};

	return { action: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
