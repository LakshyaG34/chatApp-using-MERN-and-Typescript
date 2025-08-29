import {useState} from "react"
import { useAuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";


const LogoutButton = () =>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async() =>{
        setLoading(true);
        try{
            const res = await fetch("http://localhost:4000/api/auth/logout",{
                method : "POST",
                headers: {"Content-type" : "application/json"},
                credentials: "include",
            });

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            setAuthUser(null);
        }
        catch(err : any)
        {
               toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="mt-auto">   
            {
                !loading ? (
                    <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick = {logout}/>
                ) : (
                    <span className="loading loading-spinner"></span>
                )
            }
        </div>
    )
}

export default LogoutButton;