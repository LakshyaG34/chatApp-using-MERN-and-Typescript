import React, { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";

interface ConversationType {
  name: string;
}

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation }: any = useConversation();
  const { conversations } = useGetConversations() as {
    conversations: ConversationType[];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (search.length < 3) {
      return toast.error("Search Term must be atleast 3 char long");
    }

    const conversation = conversations.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      return toast.error("No user found");
    }
  };
  return (
    <div className="min-w-0">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex items-center gap-2 text-white"
      >
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // className="rounded-full px-2 py-2 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
          className="flex-1 min-w-0 rounded-full px-2 py-2 text-white placeholder-[#22d3ee] [&::placeholder]:opacity-100 [&::placeholder]:text-shadow-[0_0_3px_#22d3ee,0_0_6px_#8b5cf6] bg-black/50 border-2 border-transparent 
              focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 
              [background:linear-gradient(black,black) padding-box,linear-gradient(to right,#8b5cf6,#ec4899,#3b82f6) border-box] font-[Orbitron,sans-serif]"
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
