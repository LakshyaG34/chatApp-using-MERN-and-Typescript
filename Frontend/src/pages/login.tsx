import React, { useState } from "react";
// import {useNavigate} from "react-router-dom"
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import {FaEnvelope, FaLock, FaUserPlus} from "react-icons/fa"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuthContext();

  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error Fetching");
      }
      const data = await res.json();
      console.log("Login success", data);

      setAuthUser(data.user);
      // navigate("/chat")
    } catch (err) {
      console.log("Cannot Fetch", err);
    }
  };
  return (
    <div className="flex flex-col items-center gap-14 font-[Orbitron,sans-serif]">
      <span
        className="font-bold text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 [text-shadow:0_0_8px_rgba(236,72,153,0.9),0_0_16px_rgba(236,72,153,0.6),0_0_48px_rgba(236,72,153,0.5)]
      hover:[text-shadow:0_0_12px_rgba(236,72,153,1),
                   0_0_24px_rgba(236,72,153,0.9),
                   0_0_48px_rgba(236,72,153,0.7)]
transition duration-300 mb-8
  "
      >
        LOG IN
      </span>
      <div className="relative rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-2xl opacity-80"></div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-[80px] opacity-60"></div>
        <div className="relative bg-gray-400/30 border border-transparent px-8 py-8 rounded-2xl backdrop-blur-md shadow-lg">
          <form
            className="flex flex-col items-center gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col text-center gap-1">
              <label className="flex flex-row items-center justify-center gap-2">
                <FaEnvelope/>
                <span>Email</span>
              </label>
              <input
                placeholder="Enter your Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] border border-transparent rounded-full px-2 py-2 text-center bg-black/50 backdrop-blur-md [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] focus:outline-none focus:ring-2 focus:ring-pink-500/70"
              />
            </div>
            <div className="flex flex-col text-center gap-1">
              <label className="flex flex-row items-center justify-center gap-2">
                <FaLock/>
                <span>Password</span>
              </label>
              <input
                placeholder="Enter your Password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full max-w-md  placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] border border-transparent rounded-full px-2 py-2 text-center bg-black/50 backdrop-blur-md [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] focus:outline-none focus:ring-2 focus:ring-pink-500/70"
              />
            </div>
            <button
              className="relative inline-block px-6 py-2 rounded-2xl text-white tracking-wider 
             bg-black/70 backdrop-blur-md border-2 border-transparent
             [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] 
             transition duration-300 ease-in-out 
             hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] 
             hover:scale-105 
             focus:outline-none focus:ring-2 focus:ring-pink-500/70 cursor-pointer"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
      <span className="flex flex-row gap-2 text-sm">
        Don't Have An Account :-
        <Link to="/signup" className="flex flex-row items-center gap-1 text-red-400 transition duration-300 ease-in-out  hover:text-blue-300">
          <FaUserPlus/>
          <span>SIGNUP</span>
        </Link>
      </span>
    </div>
  );
};

export default Login;
