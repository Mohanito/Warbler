import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// https://stackoverflow.com/questions/43882238/redux-devtool-chrome-extension-not-displaying-state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
	const store = createStore(
		rootReducer,
		composeEnhancers(
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : (f) => f
		)
	);
	return store;
}
