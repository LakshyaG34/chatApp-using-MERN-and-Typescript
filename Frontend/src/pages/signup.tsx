import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

interface UserTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic?: File;
}

const handleInputErrors = ({
  name,
  email,
  password,
  confirmPassword,
}: UserTypes) => {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all Fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords Does not match");
    return false;
  }
  if (password.length < 8) {
    toast.error("Length of Password must be greater than or equal to 8");
  }
  return true;
};
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const success = handleInputErrors({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!success) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Error Fetching");
      }
      const data = await res.json();
      console.log("Signup success", data);
      navigate("/login");
    } catch (err) {
      console.log("Cannot Fetch", err);
    }
  };
  return (
    <div className="font-[Orbitron,sans-serif] flex flex-col items-center text-white gap-2">
      <span
        className="font-bold text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 [text-shadow:0_0_8px_rgba(236,72,153,0.9),0_0_16px_rgba(236,72,153,0.6),0_0_48px_rgba(236,72,153,0.5)]
      hover:[text-shadow:0_0_12px_rgba(236,72,153,1),
                   0_0_24px_rgba(236,72,153,0.9),
                   0_0_48px_rgba(236,72,153,0.7)]
transition duration-300 mb-8
  "
      >
        SIGN UP
      </span>
      <div className="relative rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-2xl opacity-80"></div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-[80px] opacity-60"></div>
        <div className="relative bg-gray-400/30 border border-transparent rounded-2xl w-full max-w-sm px-8 py-6 backdrop-blur-md shadow-lg">
          <form
            className="flex flex-col items-center gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col text-center gap-1">
              <label className="flex flex-row items-center justify-center gap-2">
                <FaUser/>
                <span>Name</span>
              </label>
              <input
                placeholder="Enter your Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-md placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] border border-transparent rounded-full px-2 py-2 text-center bg-black/50 backdrop-blur-md [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] focus:outline-none focus:ring-2 focus:ring-pink-500/70"
              />
            </div>
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
                className="w-full max-w-md placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] border border-transparent rounded-full px-2 py-2 text-center bg-black/50 backdrop-blur-md [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] focus:outline-none focus:ring-2 focus:ring-pink-500/70"
              />
            </div>
            <div className="flex flex-col text-center gap-1">
              <label className="flex flex-row items-center justify-center gap-2">
                <FaLock/>
                <span>Confirm Password</span>
              </label>
              <input
                placeholder="Confirm your Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full max-w-md placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] border border-transparent rounded-full px-2 py-2 text-center bg-black/50 backdrop-blur-md [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] focus:outline-none focus:ring-2 focus:ring-pink-500/70"
              />
            </div>
            <div className="relative w-full">
              <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files ? e.target.files[0] : null)}
                className="w-full opacity-0 absolute inset-0 cursor-pointer"
              />
              <div className="px-1 py-1 rounded-xl bg-black/50 border border-transparent text-white text-center">
                {profilePic ? profilePic.name : "Choose Profile Picture"}
              </div>
            </div>

            <button
              className="relative inline-block w-full sm:w-auto px-6 py-2 rounded-2xl text-white tracking-wider cursor-pointer
              bg-black/70 backdrop-blur-md border-2 border-transparent
              [background:linear-gradient(#0a0a0a,#0a0a0a) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] 
              transition duration-300 ease-in-out 
              hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] 
              hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-pink-500/70"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
      <span className="flex flex-row gap-2 text-sm">
        Already Have An Account :-
        <Link to="/login" className="flex flex-row items-center gap-1 text-red-400 transition duration-300 ease-in-out  hover:text-blue-300 ">
          <FaUser/>
          <span>LOGIN</span>
        </Link>
      </span>
    </div>
  );
};

export default Signup;
