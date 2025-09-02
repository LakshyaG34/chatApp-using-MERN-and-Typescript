import LogoutButton from "./logoutButton";
import Online from "./online";
import SearchInput from "./searchInput"

const SideBar = () =>{
    return(
        <div className="border-r border-slate-500 p-2 flex flex-1 flex-col min-w-0 max-w-[160px] sm:max-w-[240px]">
                <SearchInput/>
            <div className="overflow-auto">
                <Online/>
            </div>
            <LogoutButton/>
        </div>
    )
}

export default SideBar;