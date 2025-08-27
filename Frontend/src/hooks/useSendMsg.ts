import {useState} from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const UseSendMsg = () =>{
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMsg = async(message : string) =>{
        if(!selectedConversation)
        {
            setMessages([]);
            setLoading(true);
            return;
        }
        try{
            const res = await fetch(`http://localhost:4000/api/message/send/${selectedConversation._id}`,{
                method : "POST",
                headers :{
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({message}),
                credentials: "include",
            });

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            setMessages([...(messages || []), data]);
        }catch(err : any)
        {
            toast.error(err.message);
        } finally{
            setLoading(false);
        }
    };

    return {sendMsg, loading};
};

export default UseSendMsg;