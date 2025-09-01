import React, {useState} from "react"
import { BsSend } from "react-icons/bs"
import UseSendMsg from "../../hooks/useSendMsg"

const MessageInput = () =>{
    const [message, setMessage] = useState<string>("");
    const {loading, sendMsg} = UseSendMsg();

    const handleSubmit = async(e : React.FormEvent) =>{
        e.preventDefault();
        if(!message)
        {
            return;
        }
        await sendMsg(message);
        setMessage("");
    }

    return(
        <form className="px-4 my-3" onSubmit = {handleSubmit}>
            <div className="w-full relative">
                <input type="text" placeholder="Send a Message" value={message} className="border text-sm rounded-lg block w-full p-2.5 border-gray-600  bg-black/50 text-white placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] font-[Orbitron,sans-serif] focus:outline-none focus:ring-2 focus:ring-pink-500/70" onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <div className="laoding laoding-spinner"></div> : <BsSend/>}
                </button>
            </div>
        </form>
    )
}

export default MessageInput;