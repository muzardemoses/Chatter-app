import createPencilSVG from "../../assets/Svg/Feed/create-pencil.svg";
import { Link } from "react-router-dom";
import {  useEffect, useState } from "react";
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
        <div className="py-6 px-28 flex flex-col items-center gap-12">
            <div className="w-[700px] flex justify-between items-center">
                <div className="flex flex-col gap-4 w-1/2">
                    <h4 className="text-3xl text-gray-900 font-medium uppercase">
                        Feed
                    </h4>
                    <p className="text-base text-gray-500 font-normal">
                        Explore and discover interesting content from the community.
                    </p>
                </div>

                <Link to="/create-content"
                    className=""
                >
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-3 rounded-lg flex gap-2 items-center">
                        <img src={createPencilSVG} alt="create-pencil" className="w-5 h-5 " />
                        <p className="text-base font-normal">
                            Create Content
                        </p>
                    </button>
                </Link>
            </div>
            <div className="flex flex-col gap-10 ">
                <div className="px-12 pt-5 flex justify-between w-[700px] border border-gray-300 rounded-lg box-border">
                    <button className={`flex gap-2 items-center pb-5 font-semibold ${presentTab === "ForYou" ? " border-b-4 border-blue-700" : "border-b-4 border-transparent"}`} onClick={() => handleTabChange("ForYou")}>
                        For You
                    </button>
                    <button className={`flex gap-2 items-center pb-5 font-semibold ${presentTab === "Following" ? " border-b-4 border-blue-700" : "border-b-4 border-transparent"}`} onClick={() => handleTabChange("Following")}>
                        Following
                    </button>
                    <button className={`flex gap-2 items-center pb-5 font-semibold ${presentTab === "Recent" ? " border-b-4 border-blue-700" : "border-b-4 border-transparent"}`} onClick={() => handleTabChange("Recent")}>
                        Trending || Recent
                    </button>
                </div>
                <div className=" py-5 w-full borer border-gray-300 rounded-lg box-border">
                    {presentTab === "ForYou" && <ForYouTab />}
                    {presentTab === "Following" && <FollowingTab />}
                    {presentTab === "Recent" && <RecentTab />}
                </div>
            </div>
        </div>
    )
}