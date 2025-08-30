import { useEffect, useRef } from "react";
import UseGetMsg from "../../hooks/useGetMsg";
import MsgFrame from "../msgFrame/msgFrame";
import Message from "./message";

const Messages = () =>{
    const {messages, loading} = UseGetMsg();

    const lastMsgRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        setTimeout(()=>{
            lastMsgRef.current?.scrollIntoView({behavior : "smooth"});
        }, 100);
    }, [messages]);

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