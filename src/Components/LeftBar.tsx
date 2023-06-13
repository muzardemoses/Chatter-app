import { NavLink, useLocation } from "react-router-dom"
import { FeedSVG, BookmarksSVG } from ".";

export const LeftBar = () => {
    const location = useLocation();
    return (
        <div className="h-screen w-[268px] flex flex-col gap-6 px-4 pt-8 pb-6  border-r border-gray-300">
            <h2 className=" uppercase font-bold text-4xl text-blue-700">
                Chatter
            </h2>
            <div className="flex flex-col gap-4">
                <h4 className="text-gray-900 text-lg font-medium">Overview</h4>
                <div className="flex flex-col items-center gap-1 pl-4">
                    <NavLink to="/feed"
                        className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 ${location.pathname === "/feed" ? "bg-blue-50" : ""}`}

                    >
                        <FeedSVG />
                        <h4 className={`font-semibold text-base ${location.pathname === "/feed" ? "text-blue-600" : "text-gray-900"}`}>
                            Feed
                        </h4>
                    </NavLink>
                </div>
                <div className="flex flex-col items-center gap-1 pl-4">
                    <NavLink to="/bookmarks"
                        className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 ${location.pathname === "/bookmarks" ? "bg-blue-50" : ""}`}
                    >
                        <BookmarksSVG />
                        <h4 className={`font-semibold text-base ${location.pathname === "/bookmarks" ? "text-blue-600" : "text-gray-900"}`}>
                            Bookmarks
                        </h4>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}