import { useAuthContext } from "../../context/authContext";
import {useState, useEffect} from "react"
// import "../../App.css"

interface MessageProps {
    message: {
        senderId: string;
        message: string;
        shouldShake?: boolean;
    };
}
interface authUser{
    _id : string;
}

const Message = ({ message }: MessageProps, ) => {
    const { authUser } = useAuthContext() as { authUser: authUser | null };
    const [profilePicUrl, setProfilePicUrl] = useState<string>("");
    const fromMe = authUser ? message.senderId === authUser._id : false;
    const chatClass = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-white/30 border-pink-500/50  text-[#F715AB] shadow-[0_0_12px_rgba(236,72,153,0.7)] " : "bg-black/50 border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.6)]";
    const shakeClass = message.shouldShake ? "shake" : "";

    useEffect(() =>{
            const fetchProfilePic = async() =>{
                try{
                    const response = await fetch(
                        `http://localhost:4000/api/users/profile-pic/${message.senderId}`,
                        { credentials: "include" }
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
        }, [message.senderId]);

    return(
        <div className={`chat ${chatClass} min-w-0`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePicUrl || '/default-avatar.jpg'} alt="Profile" />
                </div>
            </div>  
            <div className={`font-[Orbitron,sans-serif] font-bold chat-bubble relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg break-words border backdrop-blur-md ${bubbleBgColor} ${shakeClass} pb-2 break-all style={{ overflowWrap: "anywhere" }`}>{message.message}</div>
        </div>
    )
}

export default Message;