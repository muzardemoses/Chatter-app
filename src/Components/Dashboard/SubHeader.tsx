import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from '../../Config/userSlice';
import { auth, signOut } from '../../Config/firebase';
import notificationImg from '../../assets/Svg/Dashboard/notification.svg'
import devAvatar from '../../Images/Profile/avatar-default.png'
import { toast } from 'react-toastify';

export const SubHeader = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const SignOut = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await signOut(auth);
                dispatch(logout);
                localStorage.removeItem("user");
                window.location.href = "/";
                toast.success("Logout successful");
            } catch (error: any) {
                alert(error.message);
            }
        }
    };

    const [show, setShow] = useState(false);
    return (
        <div className="bg-white h-20 px-6 border-b border-gray-300  justify-between flex items-center">
            <div>Switch</div>
            <div className='relative'>
                <div
                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search Chatter"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-[400px] pl-10 p-2.5 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
                />
            </div>
            <div className='flex gap-3.5 items-center'>
                <NavLink to='/notifications'>
                    <img src={notificationImg} alt="bell" className='h-6 w-6' />
                </NavLink>
                <div className='h-12 w-12 rounded-full bg-gray-50 border-4 cursor-pointer transition duration-500 ease-in-out flex items-center justify-center border-purple-50 hover:border-purple-100 relative'
                    onClick={() => setShow(!show)}
                >
                    <img src={user?.photoURL || devAvatar} alt="avatar" className='h-10 w-10 rounded-full' />
                    <div
                        className="absolute w-72 bg-white border-gray-200 top-14 -right-5 rounded-lg border shadow-lg"
                        style={{ display: show ? "block" : "none" }}
                    >
                        <div className="w-full flex gap-3 pl-4 py-3 border-b-2 border-gray-50">
                            <div className="relative w-max h-max">
                                <img
                                    alt="avatar"
                                    src={user?.photoURL || devAvatar}
                                    className="h-10 w-10 rounded-full"
                                />
                                <p
                                    className="h-3 w-3 absolute bg-green-500 rounded-full border-white border-2 bottom-0 right-0"
                                ></p>
                            </div>

                            <div>
                                <p className="font-semibold text-sm text-gray-700">
                                    {user?.displayName}
                                </p>
                                <p className="text-gray-600 text-xs">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <NavLink
                            to="/"
                            className="w-full flex gap-3 pl-4 py-3 items-center hover:bg-gray-50 rounded-md transition duration-500 ease-in-out"
                        >
                            {/* <img
                                src="../assets/dashboardIcons/user.svg"
                                className="h-4 w-4"
                                alt=""
                            /> */}
                            <p className="text-gray-700 text-sm font-medium">View profile</p>
                        </NavLink>
                        <NavLink
                            to="/settings/profile"
                            className="w-full flex gap-3 pl-4 py-3 items-center border-b-2 border-gray-50 hover:bg-gray-50 rounded-md transition duration-500 ease-in-out"
                        >
                            {/* <img
                                src="../assets/dashboardIcons/settings.svg"
                                className="h-4 w-4"
                                alt=""
                            /> */}
                            <p className="text-gray-700 text-sm font-medium">Settings</p>
                        </NavLink>
                        <button
                            className="w-full flex gap-3 pl-4 py-3 items-center border-b-2 border-gray-50 hover:bg-gray-50 rounded-md transition duration-500 ease-in-out"
                            onClick={SignOut}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}