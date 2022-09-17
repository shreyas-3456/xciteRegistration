import React, { useContext, useReducer } from 'react';

import { SEND_MAIL } from '../action';
import reducer from '../reducers/reducer';

const StateProvider = React.createContext();

let intialState = {
	formError: false,
	formSuccess: false,
	text: '',
};

const ContextProvider = ({ children }) => {
	let [state, dispatch] = useReducer(reducer, { ...intialState });

	const sendEmail = (email) => {
		dispatch({ type: SEND_MAIL, payload: email });
	};

	return (
		<StateProvider.Provider
			value={{
				...state,
				sendEmail,
			}}
		>
			{children}
		</StateProvider.Provider>
	);
};

export const useFetch = () => {
	return useContext(StateProvider);
};

export default ContextProvider;
