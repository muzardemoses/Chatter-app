import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from '../../Config/userSlice';
import notificationImg from '../../assets/Svg/Dashboard/notification.svg'
import devAvatar from '../../Images/Profile/avatar-default.png'

export const SubHeader = () => {
    const user = useSelector(selectUser);
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
                <div className='h-12 w-12 rounded-full bg-gray-50 hover:border-4 cursor-pointer transition duration-500 ease-in-out flex items-center justify-center border-purple-100'>
                    <img src={user?.photoURL || devAvatar} alt="avatar" className='h-10 w-10 rounded-full' />
                </div>
            </div>
        </div>
    )
}