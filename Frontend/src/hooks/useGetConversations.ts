import {useEffect, useState} from "react"

const useGetConversations = () =>{
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    useEffect(() =>{
        const getConversations = async() =>{
            setLoading(true);
            try{
                const res = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                credentials: "include", // <- this sends cookies
                });
                const data = await res.json();
                if(data.error)
                {
                    throw new Error(data.error);
                }
                setConversations(data);
            }
            catch(err)
            {
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        };
        getConversations();
    }, []);
    return {loading, conversations};
}

export default useGetConversations;