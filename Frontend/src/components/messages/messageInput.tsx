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
                <input type="text" placeholder="Send a Message" value={message} className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 bg-gray-700 text-white" onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <div className="laoding laoding-spinner"></div> : <BsSend/>}
                </button>
            </div>
        </form>
    )
}

export default MessageInput;