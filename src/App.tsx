import React from 'react';
import './App.scss';
import AppRouter from './core/Router/AppRouter';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<div className='App'>
					<AppRouter />
				</div>
			</PersistGate>
		</Provider>
	);
};
