import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

//context object.
const SocketContext = createContext();

//custom hook.
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {

		if (authUser) {
			//connection done with the backend using websockets.
			//this is the only path for transfer.
			const socket = io("https://chat-app-yt.onrender.com", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			//backend mein i have written socket.emit, which is an event sending some data.
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();

		} 
		else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};


// What Happens on the Server Side:

// On the server side, typically a Socket.io server listens for incoming connections.
// It can then interact with the connected client (send messages, broadcast to other clients, etc.), knowing which user the connection belongs to (thanks to userId).