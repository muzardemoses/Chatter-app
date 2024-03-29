/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsers } from "../../Config/usersSlice";

import { selectUser } from "../../Config/userSlice";
import { handleFollow } from "../../Hooks";
import defaultAvatar from "../../Images/Profile/avatar-default.png";
import directHitSVG from "../../assets/Svg/Profile/direct-hit.svg";
import bullseyeSVG from "../../assets/Svg/Profile/bullseye-blue.svg";
import { useEffect, useState } from "react";


export const Following = () => {
    const { username } = useParams<{ username: string }>()

    const users = useSelector(selectUsers);
    const routeUser = users.find((user) => user.username === username);

    //const reduxUser = useSelector(selectUser);
    const loggedInUser = useSelector(selectUser);

    const [routeUserFollowing, setRouteUserFollowing] = useState<any>(null)

    useEffect(() => {
        if (routeUser) {
            const following = users.filter((user) => routeUser.following.includes(user.id))
            setRouteUserFollowing(following)
        } else {
            setRouteUserFollowing([])
        }
    }, [routeUser, users])


    const [isGreaterThanOne, setisGreaterThanOne] = useState(false)

    useEffect(() => {
        if (routeUserFollowing) {
            if (routeUserFollowing.length > 0) {
                setisGreaterThanOne(true)
            } else {
                setisGreaterThanOne(false)
            }
        }
    }, [routeUserFollowing])


    return (
        <>
            <div className="bg-white w-6/12 p-4 shadow-md rounded-lg mx-auto">
                {routeUser === undefined ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <div>
                        {isGreaterThanOne ? (
                            <ul className="flex flex-col gap-3">
                                {routeUserFollowing.map((user: any) => (
                                    <li
                                        key={user.id}
                                        className="flex justify-between"
                                    >
                                        <NavLink
                                            to={`/${user.username}`}
                                            className="flex items-center gap-4 transition duration-300 ease-in-out hover:bg-gray-100 p-2 rounded-md px-4"
                                        >
                                            <img
                                                src={user.photoURL ? user.photoURL : defaultAvatar}
                                                alt="avatar"
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <h1 className="text-gray-900 font-semibold text-base">
                                                    {user.displayName}
                                                </h1>
                                                <p className="text-gray-600 text-sm">@{user.username}</p>
                                            </div>
                                        </NavLink>
                                        <div>
                                            {loggedInUser && (
                                                <div>
                                                    {loggedInUser.id === user.id ? (
                                                        <div>
                                                            <NavLink to="/settings/profile">
                                                                <button className="self-end bg-blue-700 text-white w-28 h-11 rounded-lg text-base font-medium shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 ease-in-out">
                                                                    Edit profile
                                                                </button>
                                                            </NavLink>
                                                        </div>
                                                    ) : user.followers.includes(loggedInUser.id) ? (
                                                        <div>
                                                            <button
                                                                className="flex items-center gap-2 justify-center  text-white w-28 h-11 rounded-lg text-base font-medium shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100   disabled:cursor-not-allowed transition duration-500 bg-blue-700 hover:bg-blue-800"
                                                                onClick={() => handleFollow(loggedInUser, user)}
                                                            >
                                                                <img
                                                                    src={directHitSVG}
                                                                    alt="direct-hit"
                                                                    className="h-4 w-4"
                                                                />

                                                                <span>Following</span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <button
                                                                className="flex items-center gap-3 justify-center text-blue-900 bg-white w-28 h-11  rounded-lg border border-gray-300 text-base font-[600] shadow hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-100 focus:ring-offset-violet-100disabled:cursor-not-allowed transition duration-500 ease-in-out"
                                                                onClick={() => handleFollow(loggedInUser, user)}
                                                            >
                                                                <img
                                                                    src={bullseyeSVG}
                                                                    alt="bullseye"
                                                                    className="h-[18px] w-[18px]"
                                                                />
                                                                Follow
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </li >
                                ))}
                            </ul >
                        ) : (
                            <div className="text-gray-500 text-sm">
                                {routeUser.id === loggedInUser?.id ? (
                                    <p>
                                        You are not following anyone yet.{" "}
                                    </p>
                                ) : (
                                    <p>This user is not following anyone yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div >
        </>
    )
}