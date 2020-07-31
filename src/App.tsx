import { hot } from 'react-hot-loader';
import React from 'react';
import './App.scss';
import AppRouter from './core/Router/AppRouter';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
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

export default hot(module)(App);
