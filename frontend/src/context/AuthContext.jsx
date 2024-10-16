import { createContext, useContext, useState } from "react";
import { json } from "react-router-dom";

export const AuthContext = createContext(); 

//context object created.
//use context to be able to use the data.
//provider to share what data needs to be shared.
//both down below.

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	value = {
		authUser,
		setAuthUser,
	};

	return (
		<AuthContext.Provider value = {value}>
			{children}
		</AuthContext.Provider>
	);
	// return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
