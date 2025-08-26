import LogoutButton from "./logoutButton";
import Online from "./online";
import SearchInput from "./searchInput"

const SideBar = () =>{
    return(
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <SearchInput/>
            <Online/>
            <div className='divider px-3'></div>
            <LogoutButton/>
        </div>
    )
}

export default SideBar;