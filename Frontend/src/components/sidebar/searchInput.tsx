import React, { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";

// interface conversationTypes{

// }

interface ConversationType {
  name: string;
  // add other properties if needed
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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border border-white text-white"
    >
      <input
        type="text"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered rounded-full text-white"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
