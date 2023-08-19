import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../Config/userSlice';
import { useDispatch } from 'react-redux';
import { auth, signOut } from '../Config/firebase';
import { Menu, Transition } from '@headlessui/react'
import { MoreGridSVG, SettingsSVG, SettingsWhiteSVG, HelpSVG, HelpWhiteSVG, DisplaySVG, DisplayWhiteSVG, LogoutSVG, LogoutWhiteSVG } from '../Components/SVG';
import { toast } from 'react-toastify';

export const MoreBar = () => {
    const dispatch = useDispatch();

    const SignOut = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await signOut(auth);
                dispatch(logout);
                localStorage.removeItem("user");
                window.location.href = "/";
                toast.success("Logout successful");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                alert(error.message);
            }
        }
    };


    return (
        <div>
            {/* <div className="relative">
                <div
                    className="flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer sm:h-8"
                    onClick={() => setShowMore(!showMore)}
                >
                    <MoreGridSVG />
                    <h4 className="font-semibold text-base text-gray-900 xl:hidden sm:text-sm sm:block">
                        More
                    </h4>
                </div>
                {showMore && (
                    <div className="absolute bottom-14 left-0 w-full h-full bg-white rounded-md shadow-lg">
                        muzarde chat app
                    </div>
                )}
            </div> */}

            <Menu as="div" className="relative ">
                <div>
                    <Menu.Button className="flex gap-3.5 w-full h-10 items-center hover:bg-blue-50 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer sm:h-8">
                        <MoreGridSVG />
                        <h4 className="font-semibold text-base text-gray-900 xl:hidden sm:text-sm sm:block">
                            More
                        </h4>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute bottom-14 left-0 w-full px-1 divide-blue-50 rounded-md bg-white shadow-lg ring-1 ring-blue-100 ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/settings"
                                    >
                                        <button
                                            className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
                                                } flex gap-3.5 w-full h-10 items-center rounded-md transition duration-100 ease-in-out py-3 pl-2 cursor-pointer sm:h-8`}
                                        >
                                            {active ? <SettingsWhiteSVG /> : <SettingsSVG />}
                                            <h4 className="font-medium text-base 2xl:text-[14px] xl:hidden sm:block">
                                                Settings & Privacy
                                            </h4>
                                        </button>
                                    </NavLink>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
                                            } flex gap-3.5 w-full h-10 items-center rounded-md transition duration-100 ease-in-out py-3 pl-2 cursor-pointer sm:h-8`}
                                    >
                                        {active ? <HelpWhiteSVG /> : <HelpSVG />}
                                        <h4 className="font-medium text-base 2xl:text-[14px] xl:hidden sm:block">
                                            Help & Support
                                        </h4>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
                                            } flex gap-3.5 w-full h-10 items-center rounded-md transition duration-100 ease-in-out py-3 pl-2 cursor-pointer sm:h-8`}
                                    >
                                        {active ? <DisplayWhiteSVG /> : <DisplaySVG />}
                                        <h4 className="font-medium text-base 2xl:text-[14px] xl:hidden sm:text-[12px] sm:block">
                                            Display & Accessibility
                                        </h4>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="py-1 border-t border-blue-100">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-blue-300 text-white' : 'text-gray-900'
                                            } flex gap-3.5 w-full h-11 items-center rounded-md transition duration-100 ease-in-out py-4 pl-2 cursor-pointer sm:h-8`}
                                        onClick={SignOut}
                                    >
                                        {active ? <LogoutWhiteSVG /> : <LogoutSVG />}
                                        <h4 className="font-medium text-base 2xl:text-[14px] xl:hidden sm:block">
                                            Logout
                                        </h4>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}