import LogoutButton from "./logoutButton";
import Online from "./online";
import SearchInput from "./searchInput"

const SideBar = () =>{
    return(
        <div className="border-r border-slate-500 p-4 flex flex-1 flex-col min-w-0 max-w-[240px]">
            <div className="overflow-auto">
                <SearchInput/>
                <Online/>
            </div>
            {/* <div className='divider px-3'></div> */}
            <LogoutButton/>
        </div>
    )
}

export default SideBar;