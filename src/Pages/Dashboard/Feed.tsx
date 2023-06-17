import createPencilSVG from "../../assets/Svg/Feed/create-pencil.svg";
import { Link } from "react-router-dom";


export const Feed = () => {
    //to={{ pathname: "/messages", state: { fromFeed: true } }}


    return (
        <div className="py-6 px-28 flex flex-col gap-12">
            <div className="flex justify-between items-center">
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
            <div className="flex flex-col gap-10">
                <div className="px-12 py-5 flex justify-between w-full border border-gray-300 rounded-lg box-border">
                    <button className="flex gap-2 items-center">
                        For You
                    </button>
                    <button className="flex gap-2 items-center">
                        Following
                    </button>
                    <button className="flex gap-2 items-center">
                        Trending || Recent
                    </button>
                </div>
                <div className="px-12 py-5 flex flex-col gap-8 w-full border border-gray-300 rounded-lg box-border"></div>
            </div>
        </div>
    )
}