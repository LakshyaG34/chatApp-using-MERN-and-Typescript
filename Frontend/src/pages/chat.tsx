// import SearchInput from "../components/sidebar/searchInput"
import SideBar from "../components/sidebar/sideBar";
import MessageContainer from "../components/messages/messageContanier";

const Chat = () => {
  return (
    // Inner container
    <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
    {/* <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"> */}
      {/* Glow Layer */}

      {/* glow effect 1 */}
      {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-3xl opacity-90"></div> */}

      {/* glow effect 2 */}
      {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-[100px] opacity-95"></div> */}

      {/* glow effect 3 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-2xl opacity-80"></div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-[80px] opacity-60"></div>

      <div
        className="relative flex flex-row h-[520px] rounded-2xl overflow-hidden 
                  bg-gray-400/30 backdrop-blur-md shadow-lg"
      >
        <SideBar/>  
        <MessageContainer />
      </div>
    </div>
  );
};

export default Chat;
