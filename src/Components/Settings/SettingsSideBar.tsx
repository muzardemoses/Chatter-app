import { useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { ProfileSVG, MailShieldSVG } from "../../Components/SVG"
import connectedSVG from "../../assets/Svg/Settings/connected.svg"
import mutedSVG from "../../assets/Svg/Settings/muted.svg"


export const SettingsSideBar = () => {
    const location = useLocation()

    const [profileOnHover, setProfileOnHover] = useState(false)
    const [mailShieldOnHover, setMailShieldOnHover] = useState(false)

    return (
        <div className="h-[91vh] w-[350px] flex flex-col gap-9 px-4 pt-8 pb-6 ">
            <h3 className="text-xl font-bold text-gray-900">
                Settings
            </h3>
            <div className="flex flex-col gap-1 px-0.5">
                <Link
                    to="/settings/profile"
                    className={`flex items-center gap-3 px-2 h-11 w-full rounded-md border-l-2 border-transparent hover:bg-blue-400 transition duration-300 ease-in-out ${location.pathname === "/settings/profile" ? "bg-blue-500 border-blue-800" : ""}`}
                    onMouseEnter={() => setProfileOnHover(true)}
                    onMouseLeave={() => setProfileOnHover(false)}
                >
                    <ProfileSVG profileOnHover={profileOnHover} />
                    <h4 className={`font-bold text-blue-500 hover:text-white ${location.pathname === "/settings/profile" ? "text-white" : ""}`}
                        style={profileOnHover ? { color: "#fff" } : { color: "" }}
                    >
                        Profile Details
                    </h4>
                </Link>

                <Link
                    to="/settings/email-and-password"
                    className={`flex items-center gap-3 px-2 h-11 w-full rounded-md border-l-2 border-transparent hover:bg-blue-400 transition duration-300 ease-in-out ${location.pathname === "/settings/email-and-password" ? "bg-blue-500 border-blue-800" : ""}`}
                    onMouseEnter={() => setMailShieldOnHover(true)}
                    onMouseLeave={() => setMailShieldOnHover(false)}
                >
                    <MailShieldSVG mailShieldOnHover={mailShieldOnHover} />
                    <h4 className={`font-bold text-blue-500 hover:text-white ${location.pathname === "/settings/email-and-password" ? "text-white" : ""}`}
                        style={mailShieldOnHover ? { color: "#fff" } : { color: "" }}
                    >
                        Email & Password
                    </h4>
                </Link>

                <Link
                    to="/settings/connected-accounts"
                    className={`flex items-center gap-3 px-2 h-11 w-full rounded-md border-l-2 border-transparent hover:bg-gray-200 transition duration-300 ease-in-out ${location.pathname === "/settings/connected-accounts" ? "bg-gray-100 border-gray-800" : ""}`}
                >
                    <img src={connectedSVG} alt="connected" className="h-6 w-6" />
                    <h4>
                        Connected Accounts
                    </h4>
                </Link>

                <Link
                    to="/settings/mutes-and-blocks"
                    className={`flex items-center gap-3 px-2 h-11 w-full rounded-md border-l-2 border-transparent hover:bg-gray-200 transition duration-300 ease-in-out ${location.pathname === "/settings/mutes-and-blocks" ? "bg-gray-100 border-gray-800" : ""}`}
                >
                    <img src={mutedSVG} alt="mute" className="h-6 w-6" />
                    <h4>
                        Mutes & Blocks
                    </h4>
                </Link>
            </div>
        </div>
    )
}