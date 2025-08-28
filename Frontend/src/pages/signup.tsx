import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";


interface UserTypes{
    name : string;
    email : string;
    password : string;
    confirmPassword : string;
}

const handleInputErrors = ({name, email, password, confirmPassword} : UserTypes) =>{
    if(!name || !email || !password || !confirmPassword)
    {
        toast.error("Please fill in all Fields");
        return false;
    }
    if(password !== confirmPassword)
    {
        toast.error("Passwords Does not match");
        return false;
    }
    if(password.length < 8)
    {
        toast.error("Length of Password must be greater than or equal to 8")
    }
    return true;    
}
const Signup = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async(e : React.FormEvent) : Promise<void> =>{
        e.preventDefault();
        const success = handleInputErrors({name, email, password, confirmPassword});
        if(!success)
        {
            return;
        }
        try{
            const res = await fetch("http://localhost:4000/api/auth/signup",{
                method : "POST",
                headers: {"Content-type" : "application/json"},
                body : JSON.stringify({name, email, password, confirmPassword})
            });
            if(!res.ok)
            {
                throw new Error("Error Fetching");
            }
            const data = await res.json();
            console.log("Signup success", data);
            navigate("/login")
        }catch(err)
        {
            console.log("Cannot Fetch", err)
        }
    }
    return(
        <div className="flex flex-col items-center text-white gap-2">
            <span>SIGN UP</span>
            <div className="border border-white px-8 py-8 rounded-2xl">
                <form className="flex flex-col items-center gap-4" onSubmit = {handleSubmit}>
                    <div className="flex flex-col text-center gap-2">
                        <label>Full Name</label>
                        <input placeholder = "Enter your Full Name" type="text" value={name} onChange = {(e) => setName(e.target.value)}className="border border-white rounded-full px-2 py-2 text-center"/>
                    </div>
                    <div className="flex flex-col text-center gap-2">
                        <label>Email</label>
                        <input placeholder = "Enter your Email" type="text" value = {email} onChange={(e)=>setEmail(e.target.value)} className="border border-white rounded-full px-2 py-2 text-center"/>
                    </div>
                    <div className="flex flex-col text-center gap-2">
                        <label>Password</label>
                        <input placeholder = "Enter your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-white rounded-full px-2 py-2 text-center"/>
                    </div>
                    <div className="flex flex-col text-center gap-2">
                        <label>Confirm Password</label>
                        <input placeholder = "Confirm your Password" type="password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} className="border border-white rounded-full px-2 py-2 text-center"/>
                    </div>
                    <button className="border rounded-2xl px-2 py-2 hover:bg-amber-300 cursor-pointer">SUBMIT</button>
                </form>
            </div>

        </div>
    )
}

export default Signup;