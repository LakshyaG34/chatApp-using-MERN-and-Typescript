import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation";
import {useEffect,useState} from "react";

interface ConversationProps {
    conversation: {
        _id: string;
        name: string;
        // add other properties as needed
    };
    lastIdx: boolean;
}

const Conversation =({conversation, lastIdx}: ConversationProps) =>{
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    const [profilePicUrl, setProfilePicUrl] = useState<string>("");

    useEffect(() =>{
        const fetchProfilePic = async() =>{
            try{
                const response = await fetch(
                    `http://localhost:4000/api/users/profile-pic/${conversation._id}`,
                    { credentials: "include" } // <--- include cookies for auth
                );
                if(response.ok)
                {
                    const data = await response.blob();
                    setProfilePicUrl(URL.createObjectURL(data));
                }
            }catch(error)
            {
                console.log("error fetching the profile pic", error);
            }
        }
        fetchProfilePic();
        return () =>{
            if (profilePicUrl) {
                URL.revokeObjectURL(profilePicUrl);
            }
        };
    }, [conversation._id]);

    return(
        <>
            <div className={`flex gap-2 items-center transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-900 hover:to-blue-900 hover:[box-shadow:0_0_15px_rgba(236,72,153,0.9),0_0_30px_rgba(59,130,246,0.8)]
             border border-transparent rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-gradient-to-r from-purple-700 to-blue-700 [box-shadow:0_0_15px_rgba(59,130,246,0.8),0_0_25px_rgba(236,72,153,0.7)]" : ""}`} onClick = {() => setSelectedConversation(conversation)}>
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className="w-12 rounded-full">
                            <img 
                                src={profilePicUrl?.trim() || '/default-avatar.jpg'} 
                                alt={conversation.name} 
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex gap-3 justify-between">
                            <p className="font-bold text-gray-200 font-[Orbitron,sans-serif]">{conversation.name}</p>
                        </div>
                    </div>
            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation;