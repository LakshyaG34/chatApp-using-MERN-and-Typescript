import { useEffect, useRef } from "react";
import UseGetMsg from "../../hooks/useGetMsg";
import MsgFrame from "../msgFrame/msgFrame";
import Message from "./message";
import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation";

const Messages = () =>{
    const {messages, loading} = UseGetMsg();
    const { socket } = useSocketContext(); // ⬅️ get socket
    // const [liveMessages, setLiveMessages] = useState(messages);
    const { setMessages } = useConversation(); // from Zustand

    const lastMsgRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        setTimeout(()=>{
            lastMsgRef.current?.scrollIntoView({behavior : "smooth"});
        }, 100);
    }, [messages]);
//     useEffect(() => {
//     if (!socket) return;
//     socket.on("newMessage", (newMsg) => {
//         setLiveMessages((prev) => [...prev, newMsg]);
//     });
//     return () => {
//         socket.off("newMessage");
//     };
//    }, [socket]);
   // Listen for real-time messages
   useEffect(() => {
       if (!socket) return;
       socket.on("newMessage", (newMsg) => {
           setMessages([...messages, newMsg]); // update Zustand messages
       });
       return () => {
           socket.off("newMessage");
       };
   }, [socket, messages, setMessages]);

    return (
        <div className="flex flex-col p-2 min-w-0">
            {
                !loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id}>
                        <Message message={message} />
                    </div>
                ))
            }
            {
                loading &&
                [...Array(3)].map((_, idx) => <MsgFrame key={idx} />)
            }
            {
                !loading &&
                messages.length === 0 &&
                (
                    <p className="text-center">Send a Message to start the conversation</p>
                )
            }
        </div>
    )
}

export default Messages;