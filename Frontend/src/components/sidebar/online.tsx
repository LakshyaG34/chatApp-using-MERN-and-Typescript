import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./conversation"

const Online = () =>{
    const {loading, conversations} = useGetConversations();

    // Define the type for a conversation object
    type ConversationType = {
        _id: string;
        idx: number;
        lastIdx: boolean;
        name : string;
    };

//     if (!conversations || !Array.isArray(conversations)) {
//     return <div>No conversations</div>; // prevent crash
//   }

    return(
        <div className="flex-1 min-w-0 py-2 flex flex-col gap-1 overflow-auto">
            {(conversations as ConversationType[]).map((conversation, idx) =>(
                <Conversation
                key={conversation._id}
                conversation={conversation}
                lastIdx={idx === (conversations as ConversationType[]).length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner flex-1 min-w-0 mx-auto'></span> : null}
        </div>
    )
}

export default Online;