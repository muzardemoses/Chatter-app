/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { handleFollow } from "../../Hooks";
import { selectUsers } from "../../Config/usersSlice";
import { selectUser } from "../../Config/userSlice";
import brokenarrowSVG from "../../assets/Svg/Profile/broken-arrow.svg";
import directHitSVG from "../../assets/Svg/Profile/direct-hit.svg";
import bullseyeSVG from "../../assets/Svg/Profile/bullseye.svg";



export const ActionButtons = () => {
    const users = useSelector(selectUsers);
    const reduxUser = useSelector(selectUser);
    // const [storageUser, setStorageUser] = useState<any>(null);

    // useEffect(() => {
    //     if (localStorage.getItem("user") !== undefined) {
    //         setStorageUser(JSON.parse(localStorage.getItem("user") || '{}'))
    //     }
    // }, [])



    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [routeUser, setRouteUser] = useState<any>(null);
    //const loggedInUser = reduxUser || storageUser;

    useEffect(() => {
        if (reduxUser) {
            setLoggedInUser(reduxUser)
            // } else if (storageUser) {
            //     setLoggedInUser(storageUser)
        }
    }, [reduxUser])

    const { username } = useParams<{ username: string }>()

    //const routeUser = users.find((user) => user.username === username);
    useEffect(() => {
        if (users) {
            setRouteUser(users.find((user: any) => user.username === username))
        }
    }, [users, username])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (routeUser && loggedInUser) {
            setLoading(false)
            //console.log(routeUser.id, loggedInUser.id)
        }
    }, [routeUser, loggedInUser])

    //if routeUser is null, then loading is true
    useEffect(() => {
        if (routeUser) {
            setLoading(false)
        }
    }, [routeUser])


    const routeId = loggedInUser?.id + '-' + routeUser?.id;

    const [buttonHover, setButtonHover] = useState(false);
    return (
        <div>
            {loading ? (
                <div className="">
                    <button className="self-end bg-blue-700 text-white w-36 py-3 rounded-lg text-base font-medium xl:py-3 md:w-28 md:py-2">
                        Loading...
                    </button>
                </div>
            ) : routeUser && loggedInUser ? (
                <div>
                    {routeUser?.id === loggedInUser?.id ? (
                        <div>
                            <Link to="/edit-profile">
                                <button className="self-end bg-blue-700 text-white px-4 h-11 rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-5">
                            <Link to={`/messages/${routeId}`}>
                                <button className="text-gray-900  rounded-lg border border-gray-300 shadow bg-white font-semibold text-base px-4 h-11 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 focus:ring-offset-gray-100    disabled:cursor-not-allowed transition duration-500 ease-in-out">
                                    Message
                                </button>
                            </Link>
                            {routeUser?.followers.includes(loggedInUser?.id) ? (
                                <button
                                    onClick={() => handleFollow(loggedInUser, routeUser)}
                                    onMouseEnter={() => setButtonHover(true)}
                                    onMouseLeave={() => setButtonHover(false)}
                                    className={`flex items-center gap-2 justify-center  text-white w-28 h-11 rounded-lg text-base font-medium shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out ${buttonHover ? "bg-red-500 hover:bg-red-600" : "bg-blue-700 hover:bg-blue-800"}`}
                                >
                                    <img
                                        src={buttonHover ? brokenarrowSVG : directHitSVG}
                                        alt={buttonHover ? "direct hit" : "broken arrow"}
                                        className="h-4 w-4"
                                    />
                                    {buttonHover ? "Unfollow" : "Following"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleFollow(loggedInUser, routeUser)}
                                    className="flex items-center gap-3 justify-center bg-blue-700 text-white px-4 h-11 rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out"
                                >
                                    <img src={bullseyeSVG} alt="bullseye" className="h-4 w-4" />
                                    Follow
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <button
                        className="self-end bg-blue-700 text-white w-36 py-3 rounded-lg text-base font-medium xl:py-3 md:w-28 md:py-2"
                        onClick={() => window.location.href = "/login"}
                    >
                        Login to follow
                    </button>
                </div>
            )}
        </div>
    )
}