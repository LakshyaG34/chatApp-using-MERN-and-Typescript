import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async(e : React.FormEvent) : Promise<void> =>{
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:4000/api/auth/login",{
                method : "POST",
                headers: {"Content-type" : "application/json"},
                body : JSON.stringify({email, password})
            });
            if(!res.ok)
            {
                throw new Error("Error Fetching");
            }
            const data = await res.json();
            console.log("Login success", data);
            navigate("/chat")
        }catch(err)
        {
            console.log("Cannot Fetch", err)
        }
    }
    return(
        <div className="flex flex-col items-center text-white gap-2">
            <span>LOG IN</span>
            <div className="border border-white px-8 py-8 rounded-2xl">
                <form className="flex flex-col items-center gap-4" onSubmit = {handleSubmit}>
                    <div className="flex flex-col text-center gap-2">
                        <label>Email</label>
                        <input placeholder = "Enter your Email" type="text" value = {email} onChange={(e)=>setEmail(e.target.value)} className="border border-white rounded-full px-2 py-2 text-center"/>
                    </div>
                    <div className="flex flex-col text-center gap-2">
                        <label>Password</label>
                        <input placeholder = "Enter your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-white rounded-full px-2 py-2 text-center"/>
                    </div>
                    <button className="border rounded-2xl px-2 py-2 hover:bg-amber-300 cursor-pointer">SUBMIT</button>
                </form>
            </div>

        </div>
    )
}

export default Login;