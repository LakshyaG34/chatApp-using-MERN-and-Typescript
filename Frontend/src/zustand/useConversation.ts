import {create} from "zustand"

interface Conversation {
  _id: string;
  name: string;
  // add other fields if needed
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
}

const useConversation = create<ConversationState>((set) =>({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation: any) => set({selectedConversation}),
    messages : [],
    setMessages : (messages: any[]) => set({messages}),
}))

export default useConversation;