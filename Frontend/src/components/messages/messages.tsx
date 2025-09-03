import { useState, useEffect, useRef } from "react";
import UseGetMsg from "../../hooks/useGetMsg";
import MsgFrame from "../msgFrame/msgFrame";
import Message from "./message";
import { useSocketContext } from "../../context/socketContext";

const Messages = () =>{
    const {messages, loading} = UseGetMsg();
    const { socket } = useSocketContext(); // ⬅️ get socket
    const [liveMessages, setLiveMessages] = useState(messages);

    const lastMsgRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        setTimeout(()=>{
            lastMsgRef.current?.scrollIntoView({behavior : "smooth"});
        }, 100);
    }, [liveMessages]);
    useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (newMsg) => {
        setLiveMessages((prev) => [...prev, newMsg]);
    });
    return () => {
        socket.off("newMessage");
    };
   }, [socket]);

    return (
        <div className="flex flex-col p-2 min-w-0">
            {
                !loading &&
                liveMessages.length > 0 &&
                liveMessages.map((message) => (
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
                liveMessages.length === 0 &&
                (
                    <p className="text-center">Send a Message to start the conversation</p>
                )
            }
        </div>
    )
}

export default Messages;