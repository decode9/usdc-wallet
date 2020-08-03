import { hot } from 'react-hot-loader';
import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Main } from './views';

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<div className='App'>
					<Main />
				</div>
			</PersistGate>
		</Provider>
	);
};

export default hot(module)(App);
