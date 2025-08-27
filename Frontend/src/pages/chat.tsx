// import SearchInput from "../components/sidebar/searchInput"
import SideBar from "../components/sidebar/sideBar";
import MessageContainer from "../components/messages/messageContanier";

const Chat = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar />
      <MessageContainer />
    </div>
  );
};

export default Chat;
