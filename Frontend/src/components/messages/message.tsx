import { useAuthContext } from "../../context/authContext";
// import useConversation from "../../zustand/useConversation";


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

const Message = ({ message }: MessageProps) => {
    const { authUser } = useAuthContext() as { authUser: authUser | null };
    // const { selectedConversation } = useConversation();
    const fromMe = authUser ? message.senderId === authUser._id : false;
    const chatClass = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "shake" : "";

    return(
        <div className={`chat ${chatClass}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img/>
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        </div>
    )
}

export default Message;