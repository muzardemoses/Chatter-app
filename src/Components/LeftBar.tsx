import { NavLink, useLocation } from "react-router-dom"
import { FeedSVG, BookmarksSVG, ExploreSVG, TeamsSVG, DraftsSVG, MessagesSVG, MoreGridSVG } from ".";

export const LeftBar = () => {
    const location = useLocation();
    return (
        <div className="h-screen w-[268px] flex flex-col justify-between px-4 pt-8 pb-6 border-r border-gray-300 2xl:w-[240px] xl:w-max md:px-2">
            <div className="flex flex-col gap-10">
                <NavLink to="/">
                    <h2 className="uppercase font-bold text-4xl text-blue-700 xl:text-center">
                        <span className="xl:hidden">
                            Chatter
                        </span>
                        <span className="hidden xl:inline text-center text-5xl font-extrabold">
                            C
                        </span>
                    </h2>

                </NavLink>
                <div className="flex flex-col gap-4">
                    {/* <h4 className="text-gray-900 text-lg font-medium">Overview</h4> */}
                    <div className="flex flex-col items-center gap-1 pl-4 xl:px-1">
                        <NavLink to="/feed"
                            className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 ${location.pathname === "/feed" ? "bg-blue-50" : ""}`}

                        >
                            <FeedSVG />
                            <h4 className={`font-semibold text-base xl:hidden ${location.pathname === "/feed" ? "text-blue-600" : "text-gray-900"}`}>
                                Feed
                            </h4>
                        </NavLink>
                    </div>
                    <div className="flex flex-col items-center gap-1 pl-4 xl:px-1">
                        <NavLink to="/explore"
                            className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 ${location.pathname === "/explore" ? "bg-blue-50" : ""}`}
                        >
                            <ExploreSVG />
                            <h4 className={`font-semibold text-base xl:hidden ${location.pathname === "/explore" ? "text-blue-600" : "text-gray-900"}`}>
                                Explore
                            </h4>
                        </NavLink>
                    </div>

                    <div className="flex flex-col items-center gap-1 pl-4 xl:px-1">
                        <NavLink to="/teams"
                            className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 ${location.pathname === "/teams" ? "bg-blue-50" : ""}`}
                        >
                            <TeamsSVG />
                            <h4 className={`font-semibold text-base xl:hidden ${location.pathname === "/teams" ? "text-blue-600" : "text-gray-900"}`}>
                                Teams
                            </h4>
                        </NavLink>
                    </div>
                    <div className="flex flex-col items-center gap-1 pl-4 xl:px-1">
                        <NavLink to="/messages"
                            className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 ${location.pathname === "/messages" ? "bg-blue-50" : ""}`}
                        >
                            <MessagesSVG />
                            <h4 className={`font-semibold text-base xl:hidden ${location.pathname === "/messages" ? "text-blue-600" : "text-gray-900"}`}>
                                Messages
                            </h4>
                        </NavLink>
                    </div>
                    <div className="flex flex-col items-center gap-1 pl-4 xl:px-1">
                        <NavLink to="/drafts"
                            className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 ${location.pathname === "/drafts" ? "bg-blue-50" : ""}`}
                        >
                            <DraftsSVG />
                            <h4 className={`font-semibold text-base xl:hidden ${location.pathname === "/drafts" ? "text-blue-600" : "text-gray-900"}`}>
                                Drafts
                            </h4>
                        </NavLink>
                    </div>
                    <div className="flex flex-col items-center gap-1 pl-4 xl:px-1">
                        <NavLink to="/bookmarks"
                            className={`flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 ${location.pathname === "/bookmarks" ? "bg-blue-50" : ""}`}
                        >
                            <BookmarksSVG />
                            <h4 className={`font-semibold text-base xl:hidden ${location.pathname === "/bookmarks" ? "text-blue-600" : "text-gray-900"}`}>
                                Bookmarks
                            </h4>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer">
                <MoreGridSVG />
                <h4 className="font-semibold text-base text-gray-900 xl:hidden">
                    More
                </h4>
            </div>
        </div>
    )
}   