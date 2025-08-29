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
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}`} onClick = {() => setSelectedConversation(conversation)}>
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className="w-12 rounded-full">
                            <img 
                                src={profilePicUrl || '/default-avatar.png'} 
                                alt={conversation.name} 
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex gap-3 justify-between">
                            <p className="font-bold text-gray-200">{conversation.name}</p>
                        </div>
                    </div>
            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation;