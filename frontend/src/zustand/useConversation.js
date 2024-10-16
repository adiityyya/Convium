import { create } from "zustand";

// const useStore = create((set)=> ({
// 	count: 0,
// 	increase: ()=> set()
// }));

const useConversation = create((set) => ({
	selectedConversation: null,

	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

	messages: [],
	
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
