// display errors to the user
import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const errorsReducer = (state = { message: null }, action) => {
	switch (action.type) {
		case ADD_ERROR:
			return { ...state, message: action.error };
		case REMOVE_ERROR:
			return { ...state, message: null };
		default:
			return state;
	}
};

export default errorsReducer;
