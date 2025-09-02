import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/authContext";
import { TiMessages } from "react-icons/ti";
import Messages from "./messages";
import MessageInput from "./messageInput";

interface authUser{
    name:string;
}

const NoChatSelected = () =>{
    const {authUser} = useAuthContext() as { authUser: authUser | null };
    return(
        <div className="font-[Orbitron,sans-serif] flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {authUser ? authUser.name : "Guest"}</p>
                <p>Select a chat to start Messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center"/>
            </div>  
        </div>
    )
}

const MessageContainer = () =>{
    const {selectedConversation, setSelectedConversation} = useConversation();
    useEffect(() =>{
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return(
        <div className="font-[Orbitron,sans-serif] flex flex-col flex-1 overflow-y-auto overflow-x-hidden h-full min-w-0 max-w-[320px]">
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2 bg-gradient-to-r from-purple-700 to-blue-700">
                        <span className="font-[Orbitron,sans-serif]">To : </span>
                        <span className="font-[Orbitron,sans-serif]">{selectedConversation.name}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        <Messages/>
                    </div>
                    <MessageInput/>

                </>
            )}
        </div>
    )
}

export default MessageContainer;