import createPencilSVG from "../../assets/Svg/Feed/create-pencil.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ForYouTab, FollowingTab, RecentTab } from "../../Components";



export const Feed = () => {
    //to={{ pathname: "/messages", state: { fromFeed: true } }}

    const [presentTab, selectPresentTab] = useState("");

    const handleTabChange = (tabName: string) => {
        selectPresentTab(tabName);
        localStorage.setItem("activeTab", tabName); // Store the active tab in local storage
    };

    useEffect(() => {
        const storedTab = localStorage.getItem("activeTab");
        if (storedTab) {
            selectPresentTab(storedTab);
        } else {
            selectPresentTab("ForYou");
            localStorage.setItem("activeTab", "ForYou"); // Set default tab and store it
        }
    }, []);


    return (
        <div className="py-6 flex items-center">
            <div className="px-12 flex flex-col items-center gap-12 w-full xl:px-6 md:px-5 sm:px-3">
                <div className="max-w-[850px] w-full flex justify-between items-center 2xl:w[650px] xl:w[600px] lg:w[650px] md:w-full">
                    <div className="flex flex-col gap-4 w-1/2">
                        <h4 className="text-3xl text-gray-900 font-medium uppercase md:text-2xl">
                            Feed
                        </h4>
                        <p className="text-base text-gray-500 font-normal sm:text-sm">
                            Explore and discover interesting content from the community.
                        </p>
                    </div>

                    <Link to="/create-content"
                        className=""
                    >
                        <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-3 rounded-lg flex gap-2 items-center sm:gap-1 sm:px-2">
                            <img src={createPencilSVG} alt="create-pencil" className="w-5 h-5 md:w-4 md:h-4" />
                            <p className="text-base font-normal md:text-sm">
                                Create Content
                            </p>
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col gap-10 items-center max-w-[850px] w-full 2xl:w[650px] xl:w[600px] lg:w[650px] md:w-full">
                    <div className="px-10 pt-5 flex justify-between w10/12 w-full border border-gray-300 rounded-lg box-border md:pt-3.5 md:px-4 sm:pt-2 sm:px-3 sm:text-sm">
                        <button className={`flex gap-2 items-center pb-5 font-semibold border-b-4 md:pb-3.5 sm:pb-2 ${presentTab === "ForYou" ? " border-blue-700" : " border-transparent"}`} onClick={() => handleTabChange("ForYou")}>
                            For You
                        </button>
                        <button className={`flex gap-2 items-center pb-5 font-semibold border-b-4 md:pb-3.5 sm:pb-2 ${presentTab === "Following" ? "border-blue-700" : "border-transparent"}`} onClick={() => handleTabChange("Following")}>
                            Following
                        </button>
                        <button className={`flex gap-2 items-center pb-5 font-semibold border-b-4 md:pb-3.5 sm:pb-2 ${presentTab === "Recent" ? " border-blue-700" : " border-transparent"}`} onClick={() => handleTabChange("Recent")}>
                            Trending || Recent
                        </button>
                    </div>
                    <div className="py-5 borer border-gray-300 rounded-lg box-border">
                        {presentTab === "ForYou" && <ForYouTab />}
                        {presentTab === "Following" && <FollowingTab />}
                        {presentTab === "Recent" && <RecentTab />}
                    </div>
                </div>
            </div>
        </div>
    )
}