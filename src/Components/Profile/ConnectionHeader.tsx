import { useParams, NavLink, useNavigate } from "react-router-dom";
import backArrowSVG from "../../assets/Svg/Profile/arrow-left.svg"


export const ConnectionHeader = () => {
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>()


    return (
        <div className="w-full pb-8 flex flex-col gap-10">
            <div
                className="h-24 bg-gradient-to-br from-blue-300 via-green-200 to-pink-300 px-10 py-5"
            >
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white rounded-md"
                    >
                        <img
                            src={backArrowSVG}
                            className="h-10 w-10 inline-block"
                            alt="arrow-left"
                        />
                    </button>
                </div>
            </div>
            <div className="bg-white w-96 p-4 shadow-lg rounded-lg mx-auto font-semibold text-base flex gap-10">
                <NavLink
                    to={`/${username}/followers`}
                    className={({ isActive }) => (isActive ? "p-3 text-center w-2/5 rounded-md bg-purple-100 text-purple-800 transition duration-500 ease-in-out" : "p-3 text-center w-2/5 rounded-md text-purple-600 transition duration-500 ease-in-out hover:text-purple-800 hover:bg-purple-100")}
                >
                    Followers
                </NavLink>
                <NavLink
                    to={`/${username}/following`}
                    className={({ isActive }) => (isActive ? "p-3 text-center w-2/5 rounded-md bg-purple-100 text-purple-800 transition duration-500 ease-in-out" : "p-3 text-center w-2/5 rounded-md text-purple-600 transition duration-500 ease-in-out hover:text-purple-800 hover:bg-purple-100")}
                >
                    Following
                </NavLink>
            </div>
        </div>
    )
}