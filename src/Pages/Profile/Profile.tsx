/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
//import { selectUser } from "../../Config/userSlice";
import { selectUsers } from "../../Config/usersSlice";
import { ActionButtons, SocialProfile } from "../../Components";
import devAvatar from '../../Images/Profile/avatar-default.png';


export const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);

    const { username } = useParams<{ username: string }>()

    //const reduxUser = useSelector(selectUser);
    //const storageUser = JSON.parse(localStorage.getItem("user") || "{}");

    const users = useSelector(selectUsers);
    ///const loggedInUser = reduxUser || storageUser;
    const routeUser = users.find((user) => user.username === username);

    useEffect(() => {
        if (routeUser) {
            setLoading(false);
            setUserNotFound(false);
        }
    }, [routeUser])

    useEffect(() => {
        setLoading(true);
        if (users.find ((user: any) => user.username === username)) {
            setUserNotFound(false);
            setLoading(false);
        } else {
            setUserNotFound(true);
            setLoading(false);
        }
    }, [users, username])
        


    

    return (
        <div className="relative">
            <div
                className="bg-gradient-to-tr from-pink-100 via-orange-200 to-purple-400 w-full absolute top-0 z-10 h-60"
            ></div>
            {loading ? (
                <div className="pt-64">
                    <p className="text-center">
                        Loading...
                    </p>
                </div>
            ) : userNotFound ? (
                <div className="pt-64">
                    <p className="text-center">
                        User not found or invalid username
                    </p>
                </div>
            ) : (
                <div className="w-full relative pt-[195px]">
                    <div className="flex justify-between px-16 w-full">
                        <div className="flex flex-col gap-10 h-max z-20 w-full"
                        //style="position: sticky; top: 0"
                        >
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex gap-8 ">
                                    <img
                                        src={routeUser?.photoURL || devAvatar}
                                        alt="avatar"
                                        className="h-40 w-40 rounded-full border-4 border-white shadow-lg bg-white"
                                    />

                                    <div className="flex flex-col gap-3 mt-16">
                                        <div>
                                            <h1 className="text-3xl font-semibold text-gray-900 w-max ">
                                                {routeUser?.displayName}
                                            </h1>
                                            <p className="text-gray-600 text-base font-normal">
                                                @{username}
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <NavLink
                                                to={`/${username}/followers`}
                                                className="text-gray-600 text-base font-semibold"
                                            >
                                                {routeUser?.followers.length} followers
                                            </NavLink>
                                            <NavLink
                                                to={`/${username}/following`}
                                                className="text-gray-600 text-base font-semibold"
                                            >
                                                {routeUser?.following.length} following
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16">
                                    <ActionButtons />
                                </div>
                            </div>
                            <SocialProfile routeUser={routeUser} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}